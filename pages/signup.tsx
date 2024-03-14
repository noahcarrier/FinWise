import React, { useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const Submition = (e: React.FormEvent) => {
        e.preventDefault(); // this make sit so that the apge doesn't reload after submitting the form
        console.log('Form Submitting:', { email, password, confirmPassword });
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

}