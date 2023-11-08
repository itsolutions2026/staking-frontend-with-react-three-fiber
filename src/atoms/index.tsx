import { RpcInterfaces } from "@proton/js";
import { atom, selector } from "recoil";
import {TOKEN} from "../consts";
import {XPRACCOUNT} from "../consts/token";


export const userState = atom({
    key: 'userState',
    default: {
        actor: '',
        permission: '',
        accountData: undefined as RpcInterfaces.UserInfo | undefined,
        metadata: {
            tokeBalance: {},
            newReward: 0,
            stakedXRP: 0,
            stakedDank: 0,
            contractSetting: {}
        }
    },
});

export const userAvatar = selector({
    key: 'userAvatar',
    get: ({get}) => {
        const user = get(userState);

        const avatar = user.accountData && user.accountData.avatar

        if (avatar) {
            if (avatar.indexOf('/9j/') !== -1) {
                return `data:image/jpeg;base64,${avatar}`
            } else if (avatar.indexOf('iVBORw0KGgo') !== -1) {
                return `data:image/png;base64,${avatar}`
            }
        }

        return 'https://bloks.io/img/proton_avatar.png'
    },
});

export const userDankBalance = selector({
    key: 'userDankBalance',
    get: ({get}) => {
        const user = get(userState);

        if (user.metadata && user.metadata.tokeBalance  && user.metadata.tokeBalance.hasOwnProperty(TOKEN.DANKTOKEN)) {

            // @ts-ignore
            return user.metadata.tokeBalance[TOKEN.DANKTOKEN].amount
        }
        return 0
    },
})

export const contractXPRBalance = selector({
    key: 'contractXPRBalance',
    get: ({get}) => {
        const user = get(userState);

        if (user.metadata && user.metadata.stakedXPR) {

            // @ts-ignore
            return user.metadata.stakedXPR
        }
        return 0
    },
})

export const userContractDankBalance = selector({
    key: 'userContractDankBalance',
    get: ({get}) => {
        const user = get(userState);

        if (user.metadata && user.metadata.userStakedToken) {

            // @ts-ignore
            console.log(user.metadata.userStakedToken)
            return user.metadata.userStakedToken
        }
        return 0
    }
})
export const contractDankBalance = selector({
    key: 'contractDankBalance',
    get: ({get}) => {
        const user = get(userState);

        if (user.metadata && user.metadata.stakedDANK) {

            // @ts-ignore
            return user.metadata.stakedDANK
        }
        return 0
    }
})


export const userNewReward = selector({
    key: 'userNewReward',
    get: ({get}) => {
        const user = get(userState);

        if (user.metadata && user.metadata.newReward ) {
            // @ts-ignore
            return user.metadata.newReward
        }
        return 0
    },
})

export const contractSettingRewardRate = selector({
    key: 'contractSettingRewardRate',
    get: ({get}) => {
        const user = get(userState);

        if (user.metadata && user.metadata.contractSetting ) {
            // @ts-ignore
            return user.metadata.contractSetting?.percentage
        }
        return 0
    }
})


export const contractSettingRewardedAmount = selector({
    key: 'contractSettingRewardedAmount',
    get: ({get}) => {
        const user = get(userState);

        if (user.metadata && user.metadata.contractSetting && user.metadata.contractSetting?.totalRewards ) {
            // @ts-ignore
            for (let i = 0; i < user.metadata.contractSetting.totalRewards.length; i++) {
                if(user.metadata.contractSetting.totalRewards[i].contract === TOKEN.XPRACCOUNT) {
                    return user.metadata.contractSetting.totalRewards[i].quantity
                }
            }

        }
        return `0 ${TOKEN.XPRTOKEN}`
    }
})
