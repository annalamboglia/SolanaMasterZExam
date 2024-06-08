import { 
    Keypair, 
    Connection, 
    LAMPORTS_PER_SOL,
    SystemProgram, 
    Transaction, 
    sendAndConfirmTransaction, 
    PublicKey 
} from "@solana/web3.js";

import wallet from "./wallet.json";

const connection = new Connection("https://api.devnet.solana.com", "finalized");

const from = Keypair.fromSecretKey(new Uint8Array(wallet));

// Indirizzo del wallet a cui inviare i fondi, deve essere di tipo PublicKey ottenuta da keygen
const to = new PublicKey("7XM6JMqSzHkLwUF9EFA5YHqRi1EbjyaMaM6YD6Cojqsa");


(async () => {
    try {
        // Creiamo una nuova instruzione per trasferire 0.5 SOL
        const transferInstruction = SystemProgram.transfer({
            fromPubkey: from.publicKey,             
            toPubkey: to,                           
            lamports: 0.5 * LAMPORTS_PER_SOL        
        });

        const transaction = new Transaction().add(transferInstruction);

        // Definiamo l'account che paga
        transaction.feePayer = from.publicKey;

        const txHash = await sendAndConfirmTransaction(connection, transaction, [from], { commitment: "finalized", skipPreflight: false });

        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txHash}?cluster=devnet`);
    } catch (error) {
        console.error(error);
    }
})();