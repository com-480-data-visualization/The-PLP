## To use the website localy:

In your terminal copy paste the following:

- Clone the repo on your computer (https link):
```bash
git clone https://github.com/com-480-data-visualization/The-PLP.git
```
- Go in the right folder, write in your terminal:
```bash
cd THE-PLP
```
-Write the following in your terminal to launch your server:
```bash
python -m http.server
```
- Go on your browser and copy pastre the following: http://localhost:8000/worldmap.html

**You have now acces to the website**



## To Use the website on the web use GitHub pages:

### Step 1: Enable GitHub Pages
1. **Go to the repository** on GitHub.
2. Click on the **Settings** tab.
3. Scroll down to the **GitHub Pages** section. (the repro need to be public)
4. Under **Source**, select either `master` or `main` branch, depending on the name of your default branch. If your project is in a folder named `docs`, you can select that as well.
5. Choose the folder where your website code is located (usually the root or `/docs` if you keep your HTML files in a `docs` directory).
6. Click **Save**, and GitHub will automatically deploy your website.

### Step 2: Access Your Website
After enabling GitHub Pages, GitHub will provide you with a URL where your website is hosted. This URL is typically:
```
https://<username>.github.io/<repository>/
```
You can find this URL in the GitHub Pages section of your repository settings after you enable it.

### Step 3: Continuous Deployment
Every time you push changes to your repository (to the branch you selected for GitHub Pages), GitHub automatically rebuilds your website and the changes will go live within minutes. This makes updating your site as simple as pushing updates to your GitHub repository.
