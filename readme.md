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

* GET /me
    ```
    header 'X-Auth-Token': string from /signin endpoint
    
    returns 
    {
        "name": "test",
        "email": "test@test.com",
        "role": "user",
        "createdAt": "2019-04-08T19:07:23.669Z"
    }
    ```
---
* GET /gallery/images
    ```
    [
        'url1',
        'url2',
        'url3',
        ...
    ]
    ```

---
* POST /contact-us - send data to Admin e-mail
    ```
    {
        name: string,
        email: string,
        subject: string,
        message: string
    }
    ```
---
* POST /articles
    ```
    {
        title: string
        description: string
        shortDescription: string
        imagesUrls: [
            url: string
        ]
        location: string
    }
    ```


* GET /articles
    ```
    [
        {
            title: string
            description: string
            shortDescription: string
            imagesUrls: [
                url: string
            ]
            location: string
        },
        ...
    ]
    ```


* PUT /articles/:id - update article, 
    accept next data:
    ```
    {
        "imagesUrls": [
            "url1", "url2"
        ],
        "title": "test",
        "description": "new descr",
        "shortDescription": "updated"
    }

    ```
    returns updated article

* DELETE /articles/:id - delete article, 


