import React from 'react'
import { useState } from 'react'
import SignIn from './Signin'
import SignInS from './SignInS'

const Form = () => {
  const [formSubmit, setformSubmit] = useState (false)
  const submitForm = () => {
    setformSubmit (true)
  }
  return ( <div>
      {!formSubmit ? ( <SignIn submitForm = {submitForm}/>) : ( <SignInS/>)}
        </div>
)  
}

export default Form
