var ActiveDirectory = require('activedirectory');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question('User name: ', function(username) {
    readline.question('Password: ', function(password) {
        var config = {
            url: 'ldap://10.0.0.4:389',
            baseDN: 'cn=users,dc=desk,dc=radar',
            username: username,
            password: password
        };
        let ad = new ActiveDirectory(config), query='cn=*';
        
        ad.findUsers(query, true, function(err, users) {
            if (err) {
                console.log('ERROR: ' +JSON.stringify(err));
            }
            else if ((! users) || (users.length == 0)) console.log('No users found.');
            else {
		users.map(user => {
			console.log(user);
		});
            }
            readline.close();
        });
    })
})