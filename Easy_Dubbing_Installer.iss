; ================================================================
;  Easy Dubbing - Windows Installer
;  Engine: pyvideotrans
;  Requires: Inno Setup 6+
;  Version: 2.1.0
; ================================================================

[Setup]
AppName=Easy Dubbing
AppVersion=2.1.0
AppPublisher=OneHostingEurope
AppPublisherURL=https://www.easydubbing.uk
AppSupportURL=https://www.easydubbing.uk/activate
DefaultDirName={autopf}\Easy Dubbing
DefaultGroupName=Easy Dubbing
UninstallDisplayIcon={app}\public\favicon.ico
OutputDir=userdocs:Easy Dubbing Output
OutputBaseFilename=Easy_Dubbing_Setup
SetupIconFile=public\favicon.ico
Compression=lzma2
SolidCompression=yes
PrivilegesRequired=admin
ShowLanguageDialog=no
WizardStyle=modern
DisableProgramGroupPage=yes

[Code]

var
  LicensePage: TInputQueryWizardPage;
  ComputerID:  String;
  LinkLabel:   TNewStaticText;

procedure LinkClick(Sender: TObject);
var
  ErrorCode: Integer;
begin
  ShellExec('open', 'https://www.easydubbing.uk/#pricing', '', '', SW_SHOWNORMAL, ewNoWait, ErrorCode);
end;

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

procedure InitializeWizard;
var
  RCode: Integer;
  HwidFile: String;
  PsCmd: String;
begin
  HwidFile := ExpandConstant('{tmp}\hwid.txt');
  PsCmd := '-Command "(Get-CimInstance Win32_ComputerSystemProduct).UUID | Set-Content ''' + HwidFile + ''' -Encoding ascii"';
  Exec('powershell.exe', PsCmd, '', SW_HIDE, ewWaitUntilTerminated, RCode);
  ComputerID := GetComputerID();

  LicensePage := CreateInputQueryPage(wpWelcome,
    'Software Activation',
    'Please enter your license details to continue.',
    'Your Computer ID is pre-filled. Enter the email and license key from your purchase.');
  LicensePage.Add('Your Computer ID (copy this for activation):', False);
  LicensePage.Add('Email Address:', False);
  LicensePage.Add('License Key (format: XXXX-XXXX-XXXX-XXXX):', False);
  LicensePage.Values[0] := ComputerID;

  LinkLabel := TNewStaticText.Create(LicensePage);
  LinkLabel.Parent     := LicensePage.Surface;
  LinkLabel.Caption    := 'Don''t have a key? Click here to Buy or Activate at easydubbing.uk';
  LinkLabel.Cursor     := crHand;
  LinkLabel.Font.Color := clBlue;
  LinkLabel.Font.Style := [fsUnderline];
  LinkLabel.Left       := 0;
  LinkLabel.Top        := LicensePage.SurfaceHeight - 28;
  LinkLabel.OnClick    := @LinkClick;
end;

function NextButtonClick(CurPageID: Integer): Boolean;
var
  WinHttp: Variant;
  Email, Key, Params: String;
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
      MsgBox('License activated successfully! Installation will now continue.', mbInformation, MB_OK);
    end else begin
      MsgBox('Activation failed.' + #13#10 + #13#10 +
             'Response: ' + WinHttp.ResponseText + #13#10 + #13#10 +
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

Source: "Launch_App.bat";        DestDir: "{app}"; Flags: ignoreversion
Source: "Stop_App.bat";          DestDir: "{app}"; Flags: ignoreversion
Source: "Repair_App.bat";        DestDir: "{app}"; Flags: ignoreversion
Source: "Debug_App.bat";         DestDir: "{app}"; Flags: ignoreversion
Source: "Install_App.ps1";       DestDir: "{app}"; Flags: ignoreversion
Source: "patch_branding.py";     DestDir: "{app}"; Flags: ignoreversion
Source: "easy_dubbing_logo.png"; DestDir: "{app}"; Flags: ignoreversion
Source: "README_APP.txt";        DestDir: "{app}"; Flags: ignoreversion
Source: "api_info.json";         DestDir: "{app}"; Flags: ignoreversion
Source: "default_args.json";     DestDir: "{app}"; Flags: ignoreversion
Source: "dist\*";                DestDir: "{app}\dist";   Flags: ignoreversion recursesubdirs createallsubdirs
Source: "public\*";              DestDir: "{app}\public"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]

Name: "{commondesktop}\Easy Dubbing";   Filename: "{app}\Launch_App.bat"; IconFilename: "{app}\public\favicon.ico"; Comment: "Launch Easy Dubbing AI"
Name: "{group}\Easy Dubbing";           Filename: "{app}\Launch_App.bat"; IconFilename: "{app}\public\favicon.ico"
Name: "{group}\Repair Easy Dubbing";    Filename: "{app}\Repair_App.bat"; Comment: "Reinstall AI libraries"
Name: "{group}\Debug Easy Dubbing";     Filename: "{app}\Debug_App.bat";  Comment: "Diagnose problems"
Name: "{group}\Uninstall Easy Dubbing"; Filename: "{uninstallexe}"

[Run]

Filename: "powershell.exe"; Parameters: "-ExecutionPolicy Bypass -NonInteractive -File ""{app}\Install_App.ps1"""; StatusMsg: "Installing AI Engine (10-20 min, please wait)..."; Flags: runascurrentuser waituntilterminated

[Messages]

FinishedHeadingLabel=Easy Dubbing is Ready!
FinishedLabel=Installation complete.%n%nDouble-click the Easy Dubbing icon on your Desktop to launch.%n%nNote: First launch will open the AI engine window. This is normal.
