/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,ts}'],
	theme: {
		extend: {
			screens: {
				xxs: '360px',
				xs: '480px',
			},
			listStyleType: {
				circle: 'circle',
			},
		},
	},
	plugins: [],
};
