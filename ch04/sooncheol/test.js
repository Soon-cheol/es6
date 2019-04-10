function rand(m, n) {
    return m + Math.floor((n - m + 1)) * Math.random();
}
//m이상 n이하 무작위 소수점없는 정수를 반환

function randFace() {
    return ["crown", "anchor", "heart", "spade", "club", "diamond"]
        [rand(0, 5)];
} // 모양은 랜덤으로 

let funds = 50; // 시작조건
let round = 0; // 현재는 0판째

while (funds > 1 && funds < 100) {
    // 자본금은 50보다는 크고 100보다는 작다 
    round++; // 판횟수 증가

    console.log(‘round $ { round }: ’);
    // 몇번째 게임
    console.log(‘\tstarting funds: $ { funds }
        p’);
    // 돈을 겁니다.

    let bets = { crown: 0, anchor: 0, heart: 0, spade: 0, club: 0, diamond: 0 };

    // 6개 모양에 건 처음 금액은 모두 0

    let totalBet = rand(1, funds);
    // 전체 거는 금액은 1~50까지 사이 랜덤

    if (totalBet == 7) {
        // 만약 7이 나온다면
        totalBet = funds;
        // 전체 금액을 건다
        bets.heart = totalBet;
        // 하트에다가 전체를 건다
    } else { //그렇지 않으면 
        // 그판에 걸 돈을 분배해서 건다
        let remaining = totalBet;
        // 남아있는돈은 전체 거는 금액 
        do {
            let bet = rand(1, remaining);
            // 거는금액은 1에서 남은 돈만큼
            let face = randFace();
            // 모양은 랜덤으로 나옴 
            bets[face] = bets[face] + bet;
            // 거는 금액은 각 모양에 따라 건다
            remaining = remaining - bet;
            //남아있는 돈은 건돈에서 뺀 금액
        } while (remaining > 0);
        // 남아있는돈이 0이 될때까지 계속
    }

    funds = funds - totalBet;
    //  전체 금액에 거는 돈은 뺀다

    console.log(‘\tbets: ’+Object.keys(bets).map(face => ‘$ { face }: $ { bets[face] }
            pence’).join(‘, ’) +
        (total: $ { totalBet }
            pence)’);

    // 주사위를 굴립니다.
    const hand = [];
    // 배열 추가 
    for (let roll = 0; roll < 3; roll++) {
        // 처음주사위는 0이고 주사위는 총3번을 굴린다
        hand.push(randFace());
        // 모양이 3가지 나온다 (배열에 요소 추가함)
    }

    console.log(‘\thand: $ { hand.join(‘, ’) }’);

    let winnings = 0;
    //처음에는 획득한 금액은 없음 

    for (let die = 0; die < hand.length; die++) {
        //잃은건 처음엔 0
        //hand배열에는 무작위 선택한 그림 3개
        //잃는것도 늘어남

        let face = hand[die];
        // 만약 모양이 선택한 그림이 아니라면
        if (bets[face] > 0) winnings = winnings + bets[face];
        // 모양에 건금액이 모양이 0보다 크면 모양에 건금액에서 돈을 얻음
    }
    funds = funds + winnings;
    //자본금은 획득한 금액을 더함 


    funds = funds + winnings;
    // 자금에 획득한 금액을 합치면 자본금이 된다. 

    console.log(‘\twinnings: $ { winnnings }’’);
}
console.log(‘\tending funds: $ { funds }’);