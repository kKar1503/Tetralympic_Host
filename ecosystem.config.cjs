module.exports = {
	apps: [
		{
			name: "api",
			script: "./src/index.js",
			env_production: {
				NODE_ENV: "production",
				DB_HOST: "localhost",
				DB_USER: "root",
				DB_PORT: 3306,
				DB_PASS: "KLKL@lol1234",
				PORT: 3000,
				HOSTNAME: "0.0.0.0",
				SECRET_KEY:
					"5724b20296db87a1a4d0352ff4ceeb5a7c475659ff6ade14c164c802c1ce493381951bc826a67a3fca0c2b2bb0296e112460d4ad23ac318326c2fea5a8d03d52",
			},
			env_development: {
				NODE_ENV: "development",
				DB_HOST: "localhost",
				DB_USER: "root",
				DB_PORT: 3306,
				DB_PASS: "KLKL@lol1234",
				PORT: 3000,
				HOSTNAME: "0.0.0.0",
				SECRET_KEY:
					"5724b20296db87a1a4d0352ff4ceeb5a7c475659ff6ade14c164c802c1ce493381951bc826a67a3fca0c2b2bb0296e112460d4ad23ac318326c2fea5a8d03d52",
			},
		},
	],
};

