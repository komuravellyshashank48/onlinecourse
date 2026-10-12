Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\ettam\.gemini\antigravity\scratch\course-management-system"
WshShell.Run """C:\Program Files\Common Files\Oracle\Java\javapath\javaw.exe"" -jar ""C:\Users\ettam\.gemini\antigravity\scratch\course-management-system\target\course-management-system-1.0.0.jar""", 0, False
