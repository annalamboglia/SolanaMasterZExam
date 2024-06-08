import { Keypair } from "@solana/web3.js";


// Andiamo a generare una nuova Keypair
const keypair = Keypair.generate();

console.log(`Hai generato il tuo nuovo wallet: ${keypair.publicKey.toBase58()} \n\n Per salvare il tuo wallet, copia e incolla il seguente JSON in un file: [${keypair.secretKey}]`)

