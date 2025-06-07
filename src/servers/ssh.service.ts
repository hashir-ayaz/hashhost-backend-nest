import { generateKeyPairSync } from 'crypto';
import * as fs from 'fs';
import * as sshpk from 'sshpk';

// const ssh = new NodeSSH();

// async function connectAndExecute(
//   host: string,
//   username: string,
//   privateKeyPath: string,
//   command: string,
// ): Promise<string> {
//   try {
//     await ssh.connect({
//       host: host,
//       username: username,
//       privateKeyPath: privateKeyPath, // Or use 'password' property
//     });

//     const result = await ssh.execCommand(command);
//     return result.stdout;
//   } catch (err) {
//     console.error('SSH error:', err);
//     throw err;
//   } finally {
//     ssh.dispose(); // Close the connection
//   }
// }

export function generateSSHKeyPair(comment = 'generated@nodejs') {
  // 1) Generate a 2048-bit RSA keypair in PEM (PKCS#1/SPKI) format:
  const { publicKey: pemPub, privateKey: pemPriv } = generateKeyPairSync(
    'rsa',
    {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki', // X.509/SPKI public key
        format: 'pem', // PEM text
      },
      privateKeyEncoding: {
        type: 'pkcs1', // PKCS#1 private key
        format: 'pem', // PEM text
      },
    },
  );

  // 2) Convert PEM public key → OpenSSH format (ssh-rsa AAAA… comment)
  const sshPub = convertPemToOpenSSH(pemPub, comment);

  // 3) Save both keys to disk.
  //    Private key: mode 0o600 so only owner can read/write.
  fs.writeFileSync(`${process.env.HOME}/.ssh/id_rsa`, pemPriv, { mode: 0o600 });
  fs.writeFileSync(`${process.env.HOME}/.ssh/id_rsa.pub`, sshPub);

  return {
    privateKey: pemPriv,
    publicKey: sshPub,
  };
}
function convertPemToOpenSSH(pemPublicKey: string, comment = ''): string {
  const keyObj = sshpk.parseKey(pemPublicKey, 'pem');
  const opensshRaw = keyObj.toString('ssh');

  // Strip the "(unnamed)" part if it exists
  const cleaned = opensshRaw.replace(/\s\(unnamed\)$/, '');

  return `${cleaned} ${comment}`.trim();
}
