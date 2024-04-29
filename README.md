## Sveltekit + Electron Bolierplate

일렉트론 ( Application) + 스벨트킷 ( UI ) 구성의 보일러 플레이트입니다. 
해당 보일러 플레이트는 아직 완성되지 않은 상태이며, 해당 프로젝트를 베이스로 만드는 프로젝트를 진행하면서
추가 작업을 통해 완성도를 높혀갈 예정입니다. 

## Node Version

Node Version은 20.11 버전 이상 사용합니다. ( 24. 04. 28일 기준 LTS )

## Package Manager ( Yarn 1.22 이상 )

Electron의 빌드로 인해 symlink 방식을 사용하는 패키지매니저는 사용하지 않습니다. 
해당 레포지토리에서는 yarn 1.22 버전을 기준으로 사용하고 있습니다. 

## Command

패키지 설치 

```bash
$yarn install
```

개발 환경 구동
```
$yarn dev
```

어플리케이션 빌드
```
$yarn pack:dev
```

## Issue Guide

- move-cli에서 `node/r` 에러 발생시 `$yarn fix:movecli` 커맨드를 한번 실행 후 재시도 합니다.
  - Unix계열에서 yarn을 통해 move-cli를 설치하면 나타나는 현상으로 End of Line 방식에 문제가 발생하는 경우 사용합니다.
- Windows 에서 빌드 에러 ( Symlink Error )
  - 윈도우에서 어플리케이션 빌드시에는 Powershell을 관리자 권한으로 실행한 후 빌드해야 합니다. ( symlink 문제 발생 )