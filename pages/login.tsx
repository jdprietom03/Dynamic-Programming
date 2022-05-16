import { Fragment } from "react";
import Head from "next/head";
import classes from "./../styles/LogIn.module.css";
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useMutation } from '@apollo/client'
import { getErrorMessage } from '../lib/form'

const SignUpMutation = gql`
  mutation SignUpMutation($username: String!, $password: String!, $name: String!, $last_name: String!, $email: String!) {
    signUp(input: { username: $username, password: $password, last_name: $last_name, name: $name, email: $email }) {
      user {
        user_name
        name
        last_name
        email
      }
    }
  }
`

export default function LogIn() {
  const [signUp] = useMutation(SignUpMutation)
  const [errorMsg, setErrorMsg] = useState()
  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    
    const currentTarget   = event.currentTarget as  HTMLFormElement
    const { elements } = currentTarget
    const usernameElement = elements.namedItem("username") as HTMLInputElement
    const passwordElement = elements.namedItem("password") as HTMLInputElement
    const nameElement = elements.namedItem("name") as HTMLInputElement
    const lastnameElement = elements.namedItem("lastname") as HTMLInputElement

    try {
        await signUp({
            variables: {
              username: usernameElement.value,
              password: passwordElement.value,
              name: nameElement.value,
              last_name: lastnameElement.value,
              email: "",
        },
    })
    console.log("Accepted! Status 202")
    } catch (error) {
      console.log("Sending data ", error)
      setErrorMsg(getErrorMessage(error))
    }
  }


  return (
    <Fragment>
      <Head>
        <title>Log In| Dynamic Programming Coders</title>

        <meta
          name="description"
          content="Sign up for the Dynamic Programming Coders platform."
        />
        <meta
          name="keywords"
          content="sign up, platform, dynamic programming coders, competitive programming, register"
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
          content="Sign Up | Dynamic Programming Coders"
        />
        <meta
          name="twitter:description"
          content="Sign up for the Dynamic Programming Coders platform."
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
                      <label htmlFor="username">User</label>
                      <input
                        type="text"
                        name="username"
                        required={true}
                        pattern="[A-Za-z]+"
                        placeholder="User"
                        autoComplete="off"
                        autoFocus
                      />
                    </div>
                    <div className={classes.form_input}>
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        required={true}
                        placeholder="Password"
                      />
                    </div>
                    <div className={classes.button_box}>
                      <div className="button_box">
                        <button type="submit">
                          <span>LOG IN</span>
                        </button>
                      </div>
                    </div>
                  </form>
              </div>
            </div>
          </div>
          <div>
              <img></img>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
