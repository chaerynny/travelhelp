# Travel Help

#### *'Multilanguage'* and *'Responsive'* Website Concierge service for the foreign travelers in Korea.

<img src="https://user-images.githubusercontent.com/66960200/99899105-0141f000-2cea-11eb-94f8-d33fadd7e266.png" alt="1" width="90%"/>

## Getting Started

### Prerequisites
- npm: npm install separately in `client` and `server` each.

```
/client npm install
/server npm install
```

### Versions
```
nodeJS v14.15.1 (nvm v0.37.0)
npm v6.14.8
mysql(AWS RDS) ^8.0.21
```
other dependencies can be checked from `server/package.json` and `client/package.json`

### Config information
You need 4 config environments information. (these files listed on `.gitignore` for the security issue)
- AWS RDS information  `/server/.env`
  - includes:
  ```
  DB_USER_NAME="(your username)"
  DB_PASSWORD="(your password)"
  DB_NAME="(your database name)"
  DB_HOST="(your databse host location)"
  DB_PORT="(your database port)"
  DB_DIALECT="mysql"
    
  SESSION_SECRET="(your secret keyword)"
    
  NODEMAILER_USER="(your available gmail id)"
  NODEMAILER_PASS="(your gmail password)"
  ```

  - note: NODEMAILER by gmail id requires security setting.
  "less secure" setting from your account, and "CAPTCHA Enable". Additionally, if your gmail account protected by 2FA, you should create an "Application Specific".
  check this out from [the official document of NODEMAILER](https://nodemailer.com/usage/using-gmail)

- Google Oauth Client API Keys  `/server/config/google.json`
  - [google cloud platform](https://console.cloud.google.com/apis/credentials/oauthclient)
- Line Oauth Client API Keys  `/server/config/line.json`
  - [line developer console](https://developers.line.biz/en/services/line-login/)
- Channel Talk API Keys  `/client/.env`
  - [channel developer guides](https://developers.channel.io/docs)

### NPM scripts (from `/server/package.json`)
- `npm start`: It will trigger nodemon & express server from 8080 port
- `npm dev`: It will trigger nodemon & express server from 3355 port under development environmnet
- `npm test`: It will trigger nodemon & express server from 3355 port under test case environmnet
- `npm prod`: It will trigger nodemon & express server from 3355 port under production environment
- `npm deploy`: It deploys(sync) current folder(`travelhelp/server`) into the specified AWS S3. It requires `aws cli` for using `aws` command. And it also requires AWS IAM permission for the AWS S3.
- `npm invalidate`: It purges cache from the CDN of the AWS cloudfront. You may need to invalidate after updating static files for updating caches. It requires `aws cli` for using `aws` command. And it also requires AWS IAM permission for the AWS CloudFront.
- available environment variables
  - `NODE_ENV=`
    - `development` / `test` / `production` available
      - you should update `/server/config/config.js` for custom environment configuration setting
      - if you don't set anything, the default value is `production`
      - You can check its related configurations from `/server/app.js` and `/server/models/index.js`
  - `SERVER_PORT=`
    - your express server port
    - default value is `8080`

## Built With
* [JavaScript, ES9](http://ecma-international.org/ecma-262/9.0/index.html) - Language
* [React](https://reactjs.org/) - Frontend, framework
* [NodeJS](https://nodejs.org/en) - Backend, server
* [Express](https://expressjs.com/) - Backend, server
* [Mysql](https://www.mysql.com/) - Backend, DB
* [Sequelize](https://sequelize.org/master) - Backend, ORM

## Versioning
- 0.1.0 | Nov/22/2020
  - Released

## WiKi
[Travel Help WiKi](https://github.com/travelhelpkr/travelhelp/wiki)
  
## License
This project is licensed under the ISC License.

## Contributors
* **[Brother Kim](https://github.com/imbrok)**
* **[Chaeryn Park](https://github.com/chaerynny)**
