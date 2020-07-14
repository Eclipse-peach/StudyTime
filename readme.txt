DB를 받아오는 과정에서 Lock이 걸려서, mongod --dbpath=data 코드가 오류가 발생합니다.
원인은 잘 모르겠습니다 ㅠㅠ
그러나 실제 서비스를 진행하게 된다면, 서버를 실행하는 컴퓨터는 하나일 것이기 때문에, 이는 별로 중요치 않은 이슈라고 생각합니다.

해당 오류를 우회하여 실행하려면, 기존의 data는 무시하고, data2 같은 새로운 DB를 생성하여 mongod --dbpath=data2 같은 방식으로 해줘야 합니다.
단, 새로운 DB이기 때문에 기존의 정보는 받아올 수 없고, 회원가입을 또 새로 해줘야 합니다.

Timer는 StartTimer StopTimer ResetTimer가 있습니다.
Start는 말그대로 타이머 시작, StopTimer는 일시정지, ResetTimer는 DB에 시간 값을 보내주고, Timer의 InnerHTML을 00:00:00으로 Reset해줍니다.

감사합니다.
