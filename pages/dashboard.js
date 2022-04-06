import Topbar from './topbar';
import Link from 'next/link';
import Sidebar from './sidebar';
import Content from './content';
import Head from 'next/head';

const Signup = () => {
    return (
        <div id="wrapper">

            <Head>
                <title>Dashboard</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Dashboard' />
            </Head>
            <Topbar />
            <Sidebar />
            <Content />


        </div>

    );
};

export default Signup;