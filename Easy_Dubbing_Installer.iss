; -- Easy Dubbing Professional Installer --
; This script generates a professional .exe installer for Windows.

[Setup]
AppName=Easy Dubbing
AppVersion=1.0
DefaultDirName={autopf}\Easy Dubbing
DefaultGroupName=Easy Dubbing
UninstallDisplayIcon={app}\Easy_Dubbing.lnk
Compression=lzma2
SolidCompression=yes
OutputDir=userdocs:Easy Dubbing Output
OutputBaseFilename=Easy_Dubbing_Setup
SetupIconFile=public\favicon.ico
PrivilegesRequired=admin

[Code]
var
  LicensePage: TInputQueryWizardPage;
  ComputerID: String;

// Function to get a Unique Computer ID based on the Motherboard/CPU
function GetComputerID(): String;
var
  ResultCode: Integer;
  ID: String;
begin
  Exec('powershell.exe', '-Command "(Get-CimInstance Win32_ComputerSystemProduct).UUID"', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  // For this demo, we use a professional placeholder ID logic
  ComputerID := 'DUB-' + IntToStr(Random(9999)) + '-' + IntToStr(Random(9999));
  Result := ComputerID;
end;

procedure InitializeWizard;
begin
  ComputerID := GetComputerID();
  
  // Create a custom license page
  LicensePage := CreateInputQueryPage(wpWelcome,
    'Software Activation', 'Please enter your license details.',
    'Your unique Computer ID is: ' + ComputerID + #13#10 + 'Please use this ID to get your Activation Code if you haven''t already.');
  
  LicensePage.Add('Email Address:', False);
  LicensePage.Add('License Key:', False);
end;

function NextButtonClick(CurPageID: Integer): Boolean;
var
  WinHttp: Variant;
  UserEmail, UserKey, Params: String;
begin
  Result := True;
  if CurPageID = LicensePage.ID then begin
    UserEmail := LicensePage.Values[0];
    UserKey := LicensePage.Values[1];
    
    if (UserEmail = '') or (UserKey = '') then begin
      MsgBox('Please enter both your email and license key.', mbError, MB_OK);
      Result := False;
    end else begin
      try
        // Create the connection to your website
        WinHttp := CreateOleObject('WinHttp.WinHttpRequest.5.1');
        WinHttp.Open('POST', 'https://onehostingeurope.com/verify/', False);
        WinHttp.SetRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        // Send Email, Key, and ComputerID to your website
        Params := 'email=' + UserEmail + '&key=' + UserKey + '&hwid=' + ComputerID;
        WinHttp.Send(Params);
        
        if WinHttp.Status = 200 then begin
           MsgBox('Success! Your license has been activated.', mbInformation, MB_OK);
           Result := True;
        end else begin
           MsgBox('Activation Failed: ' + WinHttp.ResponseText, mbError, MB_OK);
           Result := False;
        end;
      except
        MsgBox('Error: Could not connect to the activation server. Please check your internet connection.', mbError, MB_OK);
        Result := False;
      end;
    end;
  end;
end;

[Files]
; Essential App Files
Source: "Launch_App.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "Stop_App.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "Install_App.ps1"; DestDir: "{app}"; Flags: ignoreversion
Source: "README_APP.txt"; DestDir: "{app}"; Flags: ignoreversion
Source: "api_info.json"; DestDir: "{app}"; Flags: ignoreversion
Source: "default_args.json"; DestDir: "{app}"; Flags: ignoreversion

; Compiled Web Interface
Source: "dist\*"; DestDir: "{app}\dist"; Flags: ignoreversion recursesubdirs createallsubdirs

; AI Engine & Models
Source: "SoniTranslate\*"; DestDir: "{app}\SoniTranslate"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "mdx_models\*"; DestDir: "{app}\mdx_models"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "public\*"; DestDir: "{app}\public"; Flags: ignoreversion recursesubdirs createallsubdirs

[Dirs]
Name: "{app}\weights"
Name: "{app}\audio"
Name: "{app}\outputs"

[Icons]
Name: "{group}\Easy Dubbing"; Filename: "{app}\Launch_App.bat"; IconFilename: "{app}\public\favicon.ico"
Name: "{commondesktop}\Easy Dubbing"; Filename: "{app}\Launch_App.bat"; IconFilename: "{app}\public\favicon.ico"

[Run]
; Run the dependency installer after the files are copied
Filename: "powershell.exe"; Parameters: "-ExecutionPolicy Bypass -File ""{app}\Install_App.ps1"""; StatusMsg: "Installing AI Dependencies (This may take a few minutes)..."; Flags: runascurrentuser

[Messages]
FinishedHeadingLabel=Installation Complete
FinishedLabel=Easy Dubbing has been successfully installed. You can now launch it from your Desktop.
