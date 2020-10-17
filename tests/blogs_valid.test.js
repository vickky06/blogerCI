const Page = require('./helper/page');//this is proxy
let page;
beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
});

afterEach(async () => {
    await page.close();
});




describe('when logged in', async () => {
    beforeEach(async () => {
        await page.login();
        await page.click('a.btn-floating');
    });
    describe('And using valid Inputs', async () => {
        beforeEach(async () => {
            ///try inputting title and content
            await page.type('.title input', "TEST TITLE")
            await page.type('.content input', "TEST Content")
            await page.click('form button')
        });

        test("Submitting takes user to review screen", async () => {
            ///check if confirmation title pops up
            const confirm = await page.getContentsOf('h5');//header style
            expect(confirm).toEqual('Please confirm your entries');
        });

        test("Submitting then saving add blogs to index page", async () => {  //index : routes/blogs--> all the blogs
            await page.click('button.green');
            await page.waitFor('.card')//wait for cards
            const title = await page.getContentsOf('.card-title');
            const text =await  page.getContentsOf('p');
            expect(title).toEqual('TEST TITLE');
            expect(text).toEqual('TEST Content');

        });
    });
    

}) ////when some pre steps are required