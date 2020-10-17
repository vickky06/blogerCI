const Page = require('./helper/page');//this is proxy
let page;
const actions = [                      //we can keep on adding other get/post etc requests here
    {
        method:'get',
        path:'/api/blogs'
    },
    {
        method:'post',
        path:'/api/blogs',
        data:{
            'title': "My Title",
            'content': "My Content"
        }

    }
]
beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
});

afterEach(async () => {
    await page.close();
});


describe("user is not logged in", async () => {
    test("user should not read/write when not logged in",async()=>{
        const results = await page.execRequests(actions);////returns an array of promises
        for (let result of results){
            // console.log(result) //=>{ error: 'You must log in!' } 
            expect(result).toEqual({ error: 'You must log in!' })
        }
    });

})










    // test('User can not create blog posts', async () => {
    //     const results = await page.post('/api/blogs',
    //         {
    //             'title': "My Title",
    //             'content': "My Content"
    //         }

    //     );
    //     // const results = await page.evaluate(()=>{
    //     //     return fetch('/api/blogs',{
    //     //         method:"POST",
    //     //         credentials:'same-origin',
    //     //         headers:{
    //     //             'Content-type':"application/json"
    //     //         },body:JSON.stringify({
    //     //             'title':"My Title",
    //     //             'content':"My Content"
    //     //         })
    //     //     }).then(res=>res.json());
    //     // });
    //     console.log(results);
    //     expect(results).toEqual({ error: 'You must log in!' })
    // });

    // test('User can not read blog posts', async () => {
    //     const results = await page.get('/api/blogs');
    //     // const results = await page.evaluate(()=>{
    //     //     return fetch('/api/blogs',{
    //     //         method:"GET",
    //     //         credentials:'same-origin',
    //     //         headers:{
    //     //             'Content-type':"application/json"
    //     //         }
    //     //     }).then(res=>res.json());
    //     // });
    //     console.log(results);
    //     expect(results).toEqual({ error: 'You must log in!' })
    // });


