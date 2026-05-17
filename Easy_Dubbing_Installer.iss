; ================================================================
;  Easy Dubbing AI - Windows Installer
;  Engine : pyvideotrans (jianchang512)
;  Runtime: uv + Python 3.12 (self-managed)
;  Builder: Inno Setup 6+
;  Version: 2.1.0
; ================================================================

[Setup]
AppId={{8F3A1D2C-7E4B-4F9A-B8C0-1A2D3E4F5678}}
AppName=Easy Dubbing
AppVersion=2.1.0
AppVerName=Easy Dubbing 2.1.0
AppPublisher=OneHostingEurope
AppPublisherURL=https://www.easydubbing.uk
AppSupportURL=https://www.easydubbing.uk/activate
AppUpdatesURL=https://www.easydubbing.uk

; Install path
DefaultDirName={autopf}\Easy Dubbing
DefaultGroupName=Easy Dubbing
DisableDirPage=yes
DisableProgramGroupPage=yes

; Output
OutputDir=userdocs:Easy Dubbing Output
OutputBaseFilename=Easy_Dubbing_Setup
SetupIconFile=public\favicon.ico
UninstallDisplayIcon={app}\public\favicon.ico
UninstallDisplayName=Easy Dubbing

; Compression
Compression=lzma2/ultra64
SolidCompression=yes
LZMAUseSeparateProcess=yes

; Requirements
MinVersion=10.0
PrivilegesRequired=admin
ArchitecturesInstallIn64BitMode=x64compatible

; Wizard
WizardStyle=modern
ShowLanguageDialog=no
DisableWelcomePage=no

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Code]

var
  LicensePage : TInputQueryWizardPage;
  ComputerID  : String;
  LinkLabel   : TNewStaticText;

{ ── Open pricing page when link is clicked ── }
procedure LinkClick(Sender: TObject);
var
  ErrCode: Integer;
begin
  ShellExec('open', 'https://www.easydubbing.uk/#pricing', '', '', SW_SHOWNORMAL, ewNoWait, ErrCode);
end;

{ ── Read HWID from temp file ── }
function GetComputerID(): String;
var
  SList: TStringList;
begin
  SList := TStringList.Create;
  try
    try
      SList.LoadFromFile(ExpandConstant('{tmp}\hwid.txt'));
      Result := Trim(SList.Text);
    except
      Result := 'DUB-' + IntToStr(Random(999999));
    end;
  finally
    SList.Free;
  end;
end;

{ ── Build activation page ── }
procedure InitializeWizard;
var
  RCode   : Integer;
  HwidFile: String;
  PsCmd   : String;
begin
  HwidFile := ExpandConstant('{tmp}\hwid.txt');
  PsCmd    := '-Command "(Get-CimInstance Win32_ComputerSystemProduct).UUID | Set-Content ''' + HwidFile + ''' -Encoding ascii"';
  Exec('powershell.exe', PsCmd, '', SW_HIDE, ewWaitUntilTerminated, RCode);
  ComputerID := GetComputerID();

  LicensePage := CreateInputQueryPage(wpWelcome,
    'Software Activation',
    'Please enter your license details to continue.',
    'Your Computer ID is shown below. Enter the email and license key from your purchase.');
  LicensePage.Add('Your Computer ID (keep a copy for activation):', False);
  LicensePage.Add('Email Address:', False);
  LicensePage.Add('License Key  (format: XXXX-XXXX-XXXX-XXXX):', False);
  LicensePage.Values[0] := ComputerID;

  LinkLabel          := TNewStaticText.Create(LicensePage);
  LinkLabel.Parent   := LicensePage.Surface;
  LinkLabel.Caption  := 'Don''t have a key?  Click here to Buy or Activate at easydubbing.uk';
  LinkLabel.Cursor   := crHand;
  LinkLabel.Font.Color := clBlue;
  LinkLabel.Font.Style := [fsUnderline];
  LinkLabel.Left     := 0;
  LinkLabel.Top      := LicensePage.SurfaceHeight - 28;
  LinkLabel.OnClick  := @LinkClick;
end;

{ ── Validate license key via API before install continues ── }
function NextButtonClick(CurPageID: Integer): Boolean;
var
  WinHttp       : Variant;
  Email, Key    : String;
  Params        : String;
begin
  Result := True;
  if CurPageID <> LicensePage.ID then Exit;

  Email := Trim(LicensePage.Values[1]);
  Key   := Trim(LicensePage.Values[2]);

  if (Email = '') or (Key = '') then begin
    MsgBox('Please enter both your email address and license key.', mbError, MB_OK);
    Result := False;
    Exit;
  end;

  try
    WinHttp := CreateOleObject('WinHttp.WinHttpRequest.5.1');
    WinHttp.Open('POST', 'https://easydubbing.uk/api/verify', False);
    WinHttp.SetRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    Params := 'email=' + Email + '&key=' + Key + '&hwid=' + ComputerID;
    WinHttp.Send(Params);
    if WinHttp.Status = 200 then begin
      MsgBox('License activated successfully!' + #13#10 + 'Installation will now continue.', mbInformation, MB_OK);
    end else begin
      MsgBox('Activation failed.' + #13#10 + #13#10 +
             'Server response: ' + WinHttp.ResponseText + #13#10 + #13#10 +
             'Visit easydubbing.uk/activate for help.', mbError, MB_OK);
      Result := False;
    end;
  except
    MsgBox('Could not reach the activation server.' + #13#10 +
           'Please check your internet connection and try again.', mbError, MB_OK);
    Result := False;
  end;
end;

[Files]

; ── Launchers & scripts ──────────────────────────────────────────
Source: "Launch_App.bat";        DestDir: "{app}"; Flags: ignoreversion
Source: "Stop_App.bat";          DestDir: "{app}"; Flags: ignoreversion
Source: "Repair_App.bat";        DestDir: "{app}"; Flags: ignoreversion
Source: "Debug_App.bat";         DestDir: "{app}"; Flags: ignoreversion
Source: "Install_App.ps1";       DestDir: "{app}"; Flags: ignoreversion

; ── Branding assets ──────────────────────────────────────────────
Source: "patch_branding.py";     DestDir: "{app}"; Flags: ignoreversion
Source: "easy_dubbing_logo.png"; DestDir: "{app}"; Flags: ignoreversion

; ── Config & docs ────────────────────────────────────────────────
Source: "README_APP.txt";        DestDir: "{app}"; Flags: ignoreversion isreadme
Source: "api_info.json";         DestDir: "{app}"; Flags: ignoreversion
Source: "default_args.json";     DestDir: "{app}"; Flags: ignoreversion

; ── Web dashboard (built React app) ──────────────────────────────
Source: "dist\*";   DestDir: "{app}\dist";   Flags: ignoreversion recursesubdirs createallsubdirs
Source: "public\*"; DestDir: "{app}\public"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]

Name: "{commondesktop}\Easy Dubbing";   Filename: "{app}\Launch_App.bat"; IconFilename: "{app}\public\favicon.ico"; Comment: "Launch Easy Dubbing AI"
Name: "{group}\Easy Dubbing";           Filename: "{app}\Launch_App.bat"; IconFilename: "{app}\public\favicon.ico"; Comment: "Launch Easy Dubbing AI"
Name: "{group}\Repair Easy Dubbing";    Filename: "{app}\Repair_App.bat"; IconFilename: "{app}\public\favicon.ico"; Comment: "Reinstall AI libraries"
Name: "{group}\Debug Easy Dubbing";     Filename: "{app}\Debug_App.bat";  IconFilename: "{app}\public\favicon.ico"; Comment: "Run diagnostics"
Name: "{group}\Uninstall Easy Dubbing"; Filename: "{uninstallexe}"

[Run]

Filename: "powershell.exe"; \
  Parameters: "-ExecutionPolicy Bypass -NonInteractive -WindowStyle Hidden -File ""{app}\Install_App.ps1"""; \
  StatusMsg: "Installing AI Engine — this may take 10-20 minutes, please wait..."; \
  Flags: runascurrentuser waituntilterminated

[Messages]

FinishedHeadingLabel=Easy Dubbing is Ready!
FinishedLabel=Installation complete.%n%nDouble-click the Easy Dubbing shortcut on your Desktop to launch.%n%nThe AI engine will finish setting up on first launch (internet required).
