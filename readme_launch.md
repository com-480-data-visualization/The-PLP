Pour Utiliser le siteweb en locale:

- aller sur un terminal et aller jusque au fichier du site web
- copy paste dan sle terminal: 
```bash
python -m http.server
```
- aller sur le navighateur sur : http://localhost:8000/index.html



### Step 1: Enable GitHub Pages
1. **Go to your repository** on GitHub.
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

### Step 5: Custom Domain (Optional)
If you want to use a custom domain with your GitHub Pages website:
1. Go to the repository Settings.
2. Navigate to the GitHub Pages section.
3. Enter your custom domain in the **Custom domain** field and save.

You will need to configure your DNS settings with your domain registrar to point to GitHub's servers. More details can be found in GitHub's documentation on this topic.

### Step 6: Continuous Deployment
Every time you push changes to your repository (to the branch you selected for GitHub Pages), GitHub automatically rebuilds your website and the changes will go live within minutes. This makes updating your site as simple as pushing updates to your GitHub repository.
