# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
|Valentin Peyron |301340 |
|Benoît Gallois |296867 |
| André E. Santo | 376762 |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (29th March, 5pm)

**10% of the final grade**

This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.
Please, fill the following sections about your project.

*(max. 2000 characters per section)*

### Dataset

> Find a dataset (or multiple) that you will explore. Assess the quality of the data it contains and how much preprocessing / data-cleaning it will require before tackling visualization. We recommend using a standard dataset as this course is not about scraping nor data processing.

For our project, we selected two datasets. The first is available at [Gun Deaths by Country](https://worldpopulationreview.com/country-rankings/gun-deaths-by-country), and the second can be found at [Gun Ownership by Country](https://worldpopulationreview.com/country-rankings/gun-ownership-by-country). These datasets provide valuable insights into the prevalence of gun ownership within a country, including both military and civilian sectors. They also offer an understanding of firearm-related fatalities across nations. In the `data_analysis` Jupyter notebook, we conduct preliminary data processing, examining the datasets and merging them based on the countries they have in common. Our merged dataset includes 198 countries. Additionally, we provide information on the missing values for each column. We note that the highest percentage of missing data is 20%, which we consider acceptable, especially since the affected columns are not critical to our analysis.
### Problematic

> Frame the general topic of your visualization and the main axis that you want to develop.
> - What am I trying to show with my visualization?
> - Think of an overview for the project, your motivation, and the target audience.

The aim of our project is to inform users about the link between gun ownership and crime rates in each country. 

- To do this, we're going to create a website containing an interactive map of the world. A first "discovery" tab allows you to select a country and obtain the main information (population size, number of guns per inhabitant, number of gun deaths per year...). The second "quiz" tab has a didactic aspect: when we click on a country, we have to guess its name and its degree of danger (low, medium, high) in relation to its crime rate.

- There have been mass shootings all over the world for several years now (in California, France and recently in Russia). Our site is therefore aimed at anyone wishing to study the correlation between the free exchange of weapons in a country and its crime rate, as well as at tourists concerned about the risk of danger in the countries they visit.


### Exploratory Data Analysis

> Pre-processing of the data set you chose
> - Show some basic statistics and get insights about the data

Look at the `data_analysis` Jupyter notebook, for the preprocessing and preliminary insight of our data.
### Related work
The topic of gun ownership and its related issues sparks a lot of debate. However, getting a full picture is often hard due to the difficulty in collecting data from every country. This gap has led to a significant amount of research on the subject.

From what we've seen in the existing literature, it appears that no study has yet to analyze the statistical link between gun ownership across countries and the rates of crime and death in a way that's easy for everyone to understand. While there are studies out there, they tend to be either too academic and hard to interact with or interactive but not deep enough in their analysis. Our project aims to fill this gap by exploring these relationships in depth and presenting the findings in an easy-to-digest format. We want to highlight the differences in crime and murder rates related to gun ownership without bombarding our audience with too much data, offering a fresh take that hasn't been seen before. Of course, it's possible that similar efforts have been made, but we haven't come across any in our research.

We were inspired by the way our teacher presented past projects and by different studies that, while not directly related, used similar methods to present their data. Some of the works we looked at include:

- [Gun Ownership by Country](https://worldpopulationreview.com/country-rankings/gun-ownership-by-country)
- [Countries with the Highest Gun Ownership 2024](https://ceoworld.biz/2024/01/05/revealed-countries-with-highest-gun-ownership-2024/)

And for unrelated studies that share our approach to data presentation, we found this interesting:
- [HealthMap](https://healthmap.org/pt/)
## Milestone 2 (26th April, 5pm)

[Description of the project](milestone2.pdf)

To try the curent version of our website please follow the first part of the [readme_lauch](https://github.com/com-480-data-visualization/The-PLP/blob/master/readme_launch.md). This .md shows how to run the website locally, this allows to see and test the curent features.

## Milestone 3 (31st May, 5pm)

You can find the website hosted on github pages, to see the wensite use the following address:
```bash
https://com-480-data-visualization.github.io/The-PLP/
```



## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

