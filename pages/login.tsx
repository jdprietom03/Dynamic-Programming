import { Fragment } from "react";
import Head from "next/head";
import classes from "./../styles/LogIn.module.css";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery, gql, useMutation, useApolloClient } from "@apollo/client";
import { getErrorMessage } from "../lib/form";
import DPCLogo from "./../icons/DPC-Logo.png";

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
        user_name
        name
        last_name
        email
    }
  }
`;

const SignInMutation = gql`
  mutation SignInMutation($username: String!, $password: String!) {
    signIn(input: { username: $username, password: $password }) {
      user {
        user_name
        name
        last_name
        email
      }
    }
  }
`;

export default function LogIn() {
  const [signIn] = useMutation(SignInMutation);
  const [errorMsg, setErrorMsg] = useState();
  const client = useApolloClient();
  const router = useRouter();
  const { data, loading, error } = useQuery(ViewerQuery);
  const { viewer } = data || {};
  const shouldRedirect = !(loading || error || viewer); 
  useEffect(() => {
    if(viewer) {
      router.push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRedirect]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const currentTarget = event.currentTarget as HTMLFormElement;
    const { elements } = currentTarget;
    const usernameElement = elements.namedItem("username") as HTMLInputElement;
    const passwordElement = elements.namedItem("password") as HTMLInputElement;

    try {
      await client.resetStore();
      const { data } = await signIn({
        variables: {
          username: usernameElement.value,
          password: passwordElement.value,
        },
    });
      if (data.signIn.user) {
        await router.push("/");
      }
    } catch (error) {
      console.log("Sending data ", getErrorMessage(error) );
      setErrorMsg(getErrorMessage(error));
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Log In| Dynamic Programming Coders</title>

        <meta
          name="description"
          content="Log in for the Dynamic Programming Coders platform."
        />
        <meta
          name="keywords"
          content="Log In, log in, platform, dynamic programming coders, competitive programming, register"
        />
        <meta name="robots" content="index, follow" />

        <meta
          property="og:title"
          content="Log In | Dynamic Programming Coders"
        />
        <meta
          property="og:description"
          content="Log in for the Dynamic Programming Coders platform."
        />

        {/* <meta property="og:image" content="https://dynamicprogrammingcoders.com/static/images/logo.png" />
            <meta property="og:url" content="https://dynamicprogrammingcoders.com/signup" /> */}
        <meta property="og:site_name" content="Dynamic Programming Coders" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta
          name="twitter:title"
          content="Log In | Dynamic Programming Coders"
        />
        <meta
          name="twitter:description"
          content="Log In for the Dynamic Programming Coders platform."
        />
        {/* <meta name="twitter:image" content="https://dynamicprogrammingcoders.com/static/images/logo.png" />
            <meta name="twitter:url" content="https://dynamicprogrammingcoders.com/signup" /> */}
        <meta name="twitter:site" content="@DynamicProgrammingCoders" />
        <meta name="twitter:card" content="summary_large_image" />

        <link
          rel="canonical"
          href="https://dynamicprogrammingcoders.com/signup"
        />
        <link
          rel="alternate"
          hrefLang="en-US"
          href="https://dynamicprogrammingcoders.com/signup"
        />
      </Head>
      <main className={classes.main}>
        <div className={classes.container}>
          <div className={classes.content}>
            <h1>LOG IN</h1>
            <div className={classes.login}>
              <div className={classes.content}>
                <div className={classes.description}>
                  Access to DPC platform to improve your skills today.
                </div>
              </div>
              <div className={classes.form}>
                <form onSubmit={handleSubmit} className={classes.form}>
                  <div className={classes.form_input}>
                    <label htmlFor="username"></label>
                    <input
                      type="text"
                      name="username"
                      title=""
                      required={true}
                      pattern="[A-Za-z]+"
                      placeholder="User"
                      autoComplete="off"
                      autoFocus
                    />
                  </div>
                  <div className={classes.form_input}>
                    <label htmlFor="password"></label>
                    <input
                      type="password"
                      name="password"
                      title=""
                      required={true}
                      placeholder="Password"
                    />
                  </div>
                  <div className={classes.button_box}>
                    <div className="button_box">
                      <button type="submit">
                        <span>Log In</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className={classes.signUp}>
              Don&apos;t have an account yet? &nbsp;
              <Link className={classes.link} href="/signup">
                Log In
              </Link>
            </div>
          </div>
        </div>
        <div className={classes.images}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.workbeyondcoding.com/img/2020/09/coding.webp"
            alt="background"
          />
        </div>
      </main>
    </Fragment>
  );
}
