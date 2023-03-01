import "bootstrap/dist/css/bootstrap.css"; // any global css file must be included in this _app.js file

// In Next.js, this component acts as a higher-order component (HOC) that wraps around all pages in the application that we are trying to show in the screen
export default ({Component, pageProps}) => {
	return <Component {...pageProps} />
}