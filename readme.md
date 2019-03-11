Endpoints:
* POST /signup 
    ```
    {
        name: string,
        email: string,
        password: string
        password_conf: string
    }
    ```
* POST /signin
    ```
    {
        email: string,
        password: string
    }
    
    if OK than returns 
    {
        token: string
    }
    ```

* POST /contact-us - send data to Admin e-mail
    ```
    {
        name: string,
        email: string,
        subject: string,
        message: string
    }
    ```