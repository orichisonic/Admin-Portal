# Node.js 版本问题解决方案

## 问题
当前 Node.js 版本 (v20.0.0) 太旧，不支持某些新功能（如 `addAbortListener`），导致使用 `npx` 时出错。

## 解决方案

### 方案 1: 升级 Node.js（推荐）

升级到 Node.js v20.11.0 或更高版本：

**使用 nvm-windows:**
```powershell
nvm install 20.11.0
nvm use 20.11.0
```

**或从官网下载:**
- 访问 https://nodejs.org/
- 下载最新的 LTS 版本
- 安装后重启终端

### 方案 2: 使用本地 nx（临时方案）

**使用 PowerShell 脚本:**
```powershell
.\nx.ps1 <command>
# 例如: .\nx.ps1 graph
# 例如: .\nx.ps1 build admin-portal
```

**使用 npm 脚本:**
```powershell
npm run nx <command>
# 例如: npm run nx graph
```

**使用本地二进制文件:**
```powershell
.\node_modules\.bin\nx <command>
```

### 方案 3: 设置 PowerShell 别名（当前会话）

在 PowerShell 中运行：
```powershell
. .\setup-nx-alias.ps1
```

然后就可以正常使用 `npx nx` 命令了（会被重定向到本地安装）。

## 已修复的文件

- ✅ `cypress.config.ts` - 已更新为使用 `npm run nx`
- ✅ `admin-portal/project.json` - `watch-deps` 目标已更新为使用本地 nx
- ✅ 创建了 `nx.ps1` 和 `nx.bat` 包装脚本

## 验证

升级 Node.js 后，运行以下命令验证：
```powershell
node --version  # 应该显示 v20.11.0 或更高
npx nx --version  # 应该正常工作
```

