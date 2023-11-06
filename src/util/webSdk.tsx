import ProtonWebSDK, {ProtonWebLink, LinkSession, TransactResult, Link} from '@proton/web-sdk';
import {Serialize, JsonRpc, RpcInterfaces} from '@proton/js';
import { ApiClass } from '@proton/api'
import { TOKEN} from "../consts";

export let link: ProtonWebLink | Link | undefined;
export let session: LinkSession | undefined;

interface contractSetting {
    isPaused: boolean,
    isActorStrict: boolean,
    isTokenStrict: boolean,
    isTokensEnabled: boolean,
    isContractsEnabled: boolean,
    depositToken: object,
    rewardToken: object,
    percentage: number,
}

interface Assert {
    quantity: string,
    contract: string
}

interface contractBalance {
    stakedXPR: number,
    stakedDANK: number
}
export const protonApi = new ApiClass('proton-test')

const config = {
    production: {
        chainId: '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0',
        requestAccount: 'jasendev',
        endpoints: [
            'https://proton.greymass.com'
        ]
    },
    test: {
        chainId: '71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd',
        requestAccount: 'jasenxidev',
        endpoints: [
            'https://tn1.protonnz.com'
        ]
    }
}

const REQUEST_ACCOUNT = config.test.requestAccount
const CHAIN_ID = config.test.chainId
const ENDPOINTS = config.test.endpoints

const rpc = new JsonRpc(ENDPOINTS)

export const createLink = async ({restoreSession = false}: {
    restoreSession?: boolean;
}): Promise<void> => {
    const {link: localLink, session: localSession} = await ProtonWebSDK({
        linkOptions: {
            endpoints: ENDPOINTS,
            chainId: CHAIN_ID,
            restoreSession,
        },
        transportOptions: {
            requestAccount: REQUEST_ACCOUNT,
            requestStatus: false,
            backButton: true,
        },
        selectorOptions: {
            appName: 'Dank Staking App',
        },
    });
    link = localLink;
    session = localSession;
};

export const login = async (): Promise<LinkSession> => {
    await createLink({restoreSession: false});
    if (session) {
        return session;
    } else {
        throw new Error('LOGIN: The Wallet session is not defined!');
    }
};

export const transact = async (
    actions: Serialize.Action[],
    broadcast: boolean
): Promise<TransactResult> => {
    if (session) {
        return session.transact(
            {
                transaction: {
                    actions,
                } as never,
            },
            {broadcast}
        );
    } else {
        throw new Error('TRANSACT: The Wallet session is not defined!');
    }
};

export const logout = async (): Promise<void> => {
    if (link && session) {
        await link.removeSession(REQUEST_ACCOUNT, session.auth, CHAIN_ID);
    }
    session = undefined;
    link = undefined;
};

export const reconnect = async (): Promise<LinkSession> => {
    if (!session) {
        await createLink({restoreSession: true});
    }
};

export const transfer = async ({to, amount}: { to: string, amount: string }) => {
    if (!session) {
        throw new Error('TRANSFER: The Wallet session is not defined!');
    }

    return await session.transact({
        actions: [{
            // Token contract for only XPR
            // Other tokens like XUSDC have contract "xtokens"
            account: "eosio.token",

            // Action name
            name: "transfer",

            // Action parameters
            data: {
                from: session.auth.actor,
                to: to,
                // Change precision from 4 for other assets, e.g. 6 for USDC
                quantity: `${(+amount).toFixed(4)} XPR`,
                memo: ""
            },
            authorization: [session.auth]
        }]
    }, {
        broadcast: true
    })
}

/**
 *  Get the User's available Rewards
 */

export function getAvailableReward(actor: string, rewardRate: number | undefined): Promise<number>{
    return new Promise (async (resolve) => {
        try{
            if (!rewardRate) throw new Error("Reward Rate is not defined!")

            const result = await rpc.get_table_rows({
                code: TOKEN.STAKINGACCOUNT,
                scope: TOKEN.STAKINGACCOUNT,
                table: TOKEN.BALANCETABLE,
                key_type: 'i64',
                lower_bound: actor,
                index_position: 1,
                limit: 1
            })

            if(result.rows.length > 0){
                let tokenAmount = 0, rewardAmount = 0, newRewardAmount = 0;

                const currentTimeInSec = new Date().getTime()/1000
                const userRewards = result.rows[0]?.rewards || []
                const userTokens = result.rows[0]?.tokens || []
                const lastUpdated = result.rows[0]?.LastUpdated

                if(userRewards.length){
                    userRewards.forEach((reward: Assert)=>{
                        const tokenSymbol = reward.quantity.split(' ')[1]
                        if(reward.contract == TOKEN.XPRACCOUNT && tokenSymbol == TOKEN.XPRTOKEN){
                            rewardAmount = parseFloat(reward.quantity.split(' ')[0])
                        }
                    })
                }

                if(userTokens.length ){
                    userTokens.forEach((token: Assert)=>{
                        const tokenSymbol = token.quantity.split(' ')[1]
                        if(token.contract == TOKEN.DANKACCOUNT && tokenSymbol == TOKEN.DANKTOKEN){
                            tokenAmount = parseFloat(token.quantity.split(' ')[0])
                            newRewardAmount = parseFloat((tokenAmount * (currentTimeInSec - lastUpdated) / 86400).toFixed(4))
                        }
                    })
                }

                resolve(rewardAmount + newRewardAmount)

            }
            resolve(0)
        }
        catch (e) {
            console.error("Get Available Reward Error: " , e)
            resolve(0)
        }
    })
}

/**
 * Get the Staking contract Setting Configuration
 */
export function getContractSetting() : Promise<contractSetting | undefined>{
    return new Promise (async (resolve , reject ) => {
        try {
            const result = await rpc.get_table_rows({
                code: TOKEN.STAKINGACCOUNT,
                scope: TOKEN.STAKINGACCOUNT,
                table: TOKEN.SETTINGTABLE,
                key_type: 'i64',
                limit: 1
            })

            if (result.rows.length > 0) {
                resolve(result.rows[0])
            }
            resolve(undefined)
        }
        catch (e) {
            console.error('getContractSetting Error', e)
            resolve(undefined)
        }
    });
}
export async function getProtonAvatar(account: string): Promise<RpcInterfaces.UserInfo | undefined> {
    try {
        const result = await rpc.get_table_rows({
            code: 'eosio.proton',
            scope: 'eosio.proton',
            table: 'usersinfo',
            key_type: 'i64',
            lower_bound: account,
            index_position: 1,
            limit: 1
        })

        if (result.rows.length > 0 && result.rows[0].acc === account) {
            return result.rows[0]
        }
    } catch (e) {
        console.error('getProtonAvatar error', e)
    }

    return undefined
}

export const tokenBalance = (): Promise<object> => {
    return new Promise ( async (resolve, reject)=>{
        try{
            if (session && session.auth){
                let walletBalances: any = {};
                const result = await protonApi.getAccountTokens(session.auth.actor.toString())
                result.forEach((token)=>{
                    walletBalances[token.currency] = {
                        currency: token.currency,
                        amount: token.amount,
                        contract: token.contract,
                        decimals: token.decimals
                    }
                })
                resolve(walletBalances)
            }
            throw new Error('User session is not defined')

        }
        catch (e: any) {
            reject(e.message)
        }
    })
}

export const contractXPRDANKAmount = ():Promise<contractBalance> => {
    return new Promise (async (resolve, reject)=>{
        try{
            if (session && session.auth){
                const result = await protonApi.getAccountTokens(TOKEN.STAKINGACCOUNT)
                let xprAmount = 0 , dankAmount = 0;

                result.forEach((token)=>{
                    if(token.currency == TOKEN.XPRTOKEN){
                        xprAmount = token.amount
                    }
                     else if(token.currency == TOKEN.DANKTOKEN){
                         dankAmount = token.amount
                    }
                })
                resolve({
                    stakedXPR: xprAmount,
                    stakedDANK: dankAmount
                })
            }
            throw new Error('User session is not defined')

        }
        catch (e : any) {
            console.error("contractXPRDANKAmount Error:" , 2)
            resolve({
                stakedXPR: 0,
                stakedDANK: 0
            })
        }
    });
}

export const loadData = (callback: Function): Promise<void> => {
    return new Promise(async (resolve, reject)=>{
        try{
            if(!session) throw new Error("Session is not defined!")

            const accountData = await getProtonAvatar(session.auth.actor.toString());
            const tokeBalance = await tokenBalance();
            const {stakedXPR, stakedDANK} = await contractXPRDANKAmount();
            const contractSetting = await getContractSetting();
            const availableRewards = await getAvailableReward(session.auth.actor.toString(), contractSetting?.percentage);

            const metadata = {
                tokeBalance: tokeBalance,
                stakedXPR: stakedXPR,
                stakedDank: stakedDANK,
                newReward: availableRewards,
                contractSetting: contractSetting
            }

            callback({
                actor: session.auth.actor.toString(),
                permission: session.auth.permission.toString(),
                accountData,
                metadata
            })

            resolve()
        }
        catch (e) {
            reject(e.message)
        }
    })
}
