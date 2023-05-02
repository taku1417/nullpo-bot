const CLIENT_ID = config.CLIENT_ID;
const CLIENT_SECRET = config.CLIENT_SECRET;
const code = alert(location.search('code'));
console.log(code);
    
function generateRandomString() {
    let randomString = '';
    const randomNumber = Math.floor(Math.random() * 10);
    for (let i = 0; i < 20 + randomNumber; i++) {
        randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94));
    }

    return randomString;
}


window.onload = async () => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get("access_token"), fragment.get("token_type"), fragment.get('state')];

    if(!accessToken) {
        const randomString = generateRandomString();
        localStorage.setItem('oauth-state', randomString);
        document.getElementById('login').href += `&state=${btoa(randomString)}`;
        return (document.getElementById("login").style.display = "none");
    }

    if (localStorage.getItem('oauth-state') !== atob(decodeURIComponent(state))) {
        return console.log('[discordLogin] discordログインURL部にてクリックジャッキングが検出されました。コードを確認してください。');
    }

    if (code) {
        try {
            const tokenResponseData = await request('https://discord.com/api/oauth2/token', {
                method: 'POST',
                body: new URLSearchParams({
                    client_id: process.env.CLIENT_ID || CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET || CLIENT_SECRET,
                    code,
                    grant_type: 'authorization_code',
                    redirect_uri: `http://localhost:${PORT}`,
                    scope: 'identify',
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const oauthData = await tokenResponseData.body.json();
        const UserResult = await request('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${oauthData.token_type} ${oauthData.access_token}`,
            },
        });
        console.log(await UserResult.body.json());
        } catch (error) {
            console.error(error);
        }
    }
};
console.log("html script" + var_test)