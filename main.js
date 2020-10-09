/* 
  OpenVPN IG Config Maker
*/
const fs = require('fs')
const readline = require("readline");

console.log("-= OpenVPN IG Config Maker =-")
console.log("By: Didid")
console.log("WA: +62 851-5671-6247\n")

console.log("Catatan:")
//console.log("- Jalankan command 'termux-setup-storage' terlebih dahulu jika belum pernah dijalankan sebelumnya")
console.log("- Tool ini hanya support akun vpn yang dibuat di tcpvpn.com")
console.log("- Sebelum menggunakan tool ini, harap buat akun vpn di tcpvpn.com terlebih dahulu")
console.log("- Server yang didukung masih terbatas dan akan terus bertambah seiring pembaruan\n")

console.log("Server:")
console.log("1. SGGS 7")
console.log("2. SGGS 8")
console.log("3. SGGS 9")
console.log("4. SGGS 10")
console.log("5. SGGS 11")
console.log("6. SGGS 12")
console.log("7. SGGS 13\n")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Pilih server tempat akun dibuat (1-7): ", function(server) {

	if (!parseInt(server)) {
		console.log('Harap masukkan angka 1-7')
		rl.close();
	}

	if (parseInt(server) > 7) {
		console.log('Harap masukkan angka 1-7')
		rl.close();
	}

	var ipList = [
		'49.213.16.126',
		'49.213.16.129',
		'49.213.16.130',
		'49.213.16.131',
		'49.213.16.12',
		'49.213.16.120',
		'49.213.16.121'
	];

    rl.question("Masukkan username yang telah dibuat (tanpa 'tcpvpn.com-'): ", function(username) {
    	rl.question("Masukkan password yang telah dibuat: ", function(password) {

			fs.readFile('template.ovpn', 'utf8', function (err,data) {
			  	if (err) {
			    	return console.log(err);
			  	}
			  	var config = data.replace('conf-ip', ipList[parseInt(server)-1]).replace('conf-username', 'tcpvpn.com-'+username).replace('conf-password', password).replace('conf-ip', ipList[parseInt(server)-1])
			  	fs.writeFile('/sdcard/ig.ovpn', config, function (err2) {
			  		if (err2) return console.log(err2);
			  		console.log("\nSelesai!, config disimpan di /sdcard/ig.ovpn");
			  		rl.close();
				});
			});
		});
    });
});

rl.on("close", function() {
    process.exit(0);
});