# Installation Guide - Java 21 & Maven

## 🎯 Quick Installation (Recommended)

### Option 1: Automated Installation (Easiest)

1. **Open PowerShell as Administrator**
   - Press `Windows + X`
   - Select "Windows PowerShell (Admin)" or "Terminal (Admin)"

2. **Run the installation script**
   ```powershell
   cd C:\Users\Sribhargavi\Downloads\petinfo\pet_website
   .\scripts\install-prerequisites.ps1
   ```

3. **Wait for installation to complete** (5-10 minutes)

4. **Close and reopen PowerShell/Terminal**

5. **Verify installation**
   ```powershell
   java -version
   mvn -version
   ```

---

## 📦 Manual Installation

### Step 1: Install Java 21

#### Method A: Using Chocolatey (Recommended)

1. **Install Chocolatey** (if not already installed)
   - Open PowerShell as Administrator
   - Run:
   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force
   [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
   iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

2. **Install Java 21**
   ```powershell
   choco install openjdk21 -y
   ```

#### Method B: Manual Download

1. **Download Java 21**
   - Visit: https://adoptium.net/
   - Select: Java 21 (LTS)
   - Platform: Windows x64
   - Package Type: JDK
   - Click "Download"

2. **Install Java**
   - Run the downloaded `.msi` file
   - Follow installation wizard
   - Use default settings

3. **Set JAVA_HOME**
   - Open "Environment Variables"
     - Press `Windows + R`
     - Type: `sysdm.cpl`
     - Click "Environment Variables"
   - Add new System Variable:
     - Variable name: `JAVA_HOME`
     - Variable value: `C:\Program Files\Eclipse Adoptium\jdk-21.x.x-hotspot`
   - Edit `Path` variable:
     - Add: `%JAVA_HOME%\bin`

---

### Step 2: Install Maven

#### Method A: Using Chocolatey (Recommended)

```powershell
choco install maven -y
```

#### Method B: Manual Download

1. **Download Maven**
   - Visit: https://maven.apache.org/download.cgi
   - Download: `apache-maven-3.9.x-bin.zip`

2. **Extract Maven**
   - Extract to: `C:\Program Files\Apache\maven`

3. **Set MAVEN_HOME**
   - Open "Environment Variables"
   - Add new System Variable:
     - Variable name: `MAVEN_HOME`
     - Variable value: `C:\Program Files\Apache\maven`
   - Edit `Path` variable:
     - Add: `%MAVEN_HOME%\bin`

---

## ✅ Verification

### Check Java Installation

```powershell
java -version
```

**Expected output:**
```
openjdk version "21.0.x" 2024-xx-xx LTS
OpenJDK Runtime Environment Temurin-21.0.x+x (build 21.0.x+x-LTS)
OpenJDK 64-Bit Server VM Temurin-21.0.x+x (build 21.0.x+x-LTS, mixed mode, sharing)
```

### Check Maven Installation

```powershell
mvn -version
```

**Expected output:**
```
Apache Maven 3.9.x
Maven home: C:\Program Files\Apache\maven
Java version: 21.0.x, vendor: Eclipse Adoptium
```

---

## 🚀 Next Steps

### 1. Start the Backend

```powershell
# Navigate to project directory
cd C:\Users\Sribhargavi\Downloads\petinfo\pet_website

# Start backend
.\scripts\start-backend.bat
```

### 2. Verify Backend is Running

- Open browser: http://localhost:8080/api/pets
- Should see: `[]` (empty array)

### 3. Open Frontend

- Already running in your browser
- Or open: `frontend\index.html`

---

## 🐛 Troubleshooting

### Issue: "java is not recognized"

**Solution:**
1. Close and reopen PowerShell/Terminal
2. Verify JAVA_HOME is set:
   ```powershell
   echo $env:JAVA_HOME
   ```
3. Verify Path includes Java:
   ```powershell
   echo $env:Path
   ```

### Issue: "mvn is not recognized"

**Solution:**
1. Close and reopen PowerShell/Terminal
2. Verify MAVEN_HOME is set:
   ```powershell
   echo $env:MAVEN_HOME
   ```
3. Verify Path includes Maven:
   ```powershell
   echo $env:Path
   ```

### Issue: Chocolatey installation fails

**Solution:**
1. Run PowerShell as Administrator
2. Check internet connection
3. Try manual installation method

### Issue: Port 8080 already in use

**Solution:**
1. Find process using port 8080:
   ```powershell
   netstat -ano | findstr :8080
   ```
2. Kill the process:
   ```powershell
   taskkill /PID <process_id> /F
   ```
3. Or change backend port in `backend/src/main/resources/application.properties`:
   ```properties
   server.port=8081
   ```

---

## 📋 System Requirements

### Minimum Requirements
- **OS**: Windows 10 or later
- **RAM**: 4 GB
- **Disk Space**: 2 GB free
- **Internet**: Required for initial download

### Recommended Requirements
- **OS**: Windows 11
- **RAM**: 8 GB or more
- **Disk Space**: 5 GB free
- **Internet**: Broadband connection

---

## 🔄 Alternative: Using Winget (Windows 11)

If you're on Windows 11, you can use Winget:

```powershell
# Install Java 21
winget install EclipseAdoptium.Temurin.21.JDK

# Install Maven
winget install Apache.Maven
```

---

## 📞 Need Help?

### Check Installation Status

Run this command to check what's installed:

```powershell
# Check Java
where.exe java

# Check Maven
where.exe mvn

# Check environment variables
Get-ChildItem Env: | Where-Object {$_.Name -like "*JAVA*" -or $_.Name -like "*MAVEN*"}
```

### Common Commands

```powershell
# Refresh environment variables (without restarting)
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Check Java version
java -version

# Check Maven version
mvn -version

# Test Maven
mvn --help
```

---

## 🎉 Success Checklist

- [ ] Java 21 installed
- [ ] Maven 3.9+ installed
- [ ] `java -version` works
- [ ] `mvn -version` works
- [ ] Environment variables set
- [ ] Backend starts successfully
- [ ] Frontend connects to backend

---

## 📚 Additional Resources

### Java
- Official Site: https://adoptium.net/
- Documentation: https://docs.oracle.com/en/java/javase/21/

### Maven
- Official Site: https://maven.apache.org/
- Documentation: https://maven.apache.org/guides/

### Chocolatey
- Official Site: https://chocolatey.org/
- Documentation: https://docs.chocolatey.org/

---

**Once installed, you're ready to run the backend!** 🚀

Run: `.\scripts\start-backend.bat`

---

*Last Updated: December 4, 2025*
