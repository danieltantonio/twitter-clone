export default function statToString(stat: number): string {
    const strStat = (stat).toLocaleString();

    if(stat > 9999) {
        const resStat: string[] = [];
        let numAbrev = 'K';

        if(stat >= 1000000) numAbrev = 'M';

        for(let i = 0; i < strStat.length; i++) {
            if(strStat[i] === ',') {
                resStat.push('.');
                resStat.push(strStat[i + 1]);
                break;
            }

            resStat.push(strStat[i]);
        }

        resStat.push(numAbrev);

        return resStat.join('');
    }

    return strStat;
}