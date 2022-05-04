# 基本
## 設定
### デフォルトの作成
```
aws configure
```

### 指定プロファイルの作成（testuserで作成）
```
aws configure --profile testuser
```

### プロファイル確認（デフォルト）
```
aws configure list
```

### プロファイル確認（指定）
```
aws configure list --profile testuser
```

### 一時的なプロファイル変更
```
aws s3 ls --profile testuser
```

### デフォルト変更
```
export AWS_DEFAULT_PROFILE=testuser
```

# IAM
### IAMユーザーの名前を変更する（nameA→nameB）
```
aws iam update-user --user-name nameA --new-user-name nameB --profile testuser
```
