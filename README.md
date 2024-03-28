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


Our project is to highlight the impact of weapons on the number of gun deaths worldwide.

To do this, we're going to create a website containing an interactive map of the world. There will be a first 'discovery' tab on which we can select a country and obtain all the main information (population size, number of guns per inhabitant, number of gun deaths per year...). In the second 'quiz' tab, there's a didactic aspect, where when we click on a country we have to guess its name and its degree of danger (low, medium, high).


### Exploratory Data Analysis

> Pre-processing of the data set you chose
> - Show some basic statistics and get insights about the data

Look at the `data_analysis` Jupyter notebook, for the preprocessing and preliminary insight of our data.
### Related work

The discourse surrounding gun ownership and associated themes constitutes a subject matter of extensive debate, albeit one that is often inadequately documented due to challenges in comprehensive data collection across all countries. Consequently, a substantial body of literature has emerged on this subject.

However, it is our opinion, based on our review of existing scholarship, that no prior research endeavor has systematically examined the statistical relationship between gun ownership across various nations and crime and mortality rates in a visually accessible manner conducive to comprehension by a broad readership. While some studies have presented data and their interrelation in a scholarly and non-interactive format, and others have utilized interactive methods, none have delved as deeply into the correlation between these phenomena as our project endeavors to do, while keeping the information accessible to everyone
.
We believe that by employing various methodologies to emphasize disparities in values, specifically pertaining to crime and murder rates, without overwhelming the user with excessive data points, our project achieves a novel synthesis of information unparalleled by prior works. Nevertheless, we acknowledge the possibility that similar approaches may have been undertaken in related research; however, such instances were not found in the course of our investigation.

Our inspiration was taken from the presentation the teacher made in the first class of previous works, as well as works done in different topics but using similar techniques.

Some related works can be found at : 
- https://worldpopulationreview.com/country-rankings/gun-ownership-by-country
- https://ceoworld.biz/2024/01/05/revealed-countries-with-highest-gun-ownership-2024/

Unrelated works that use similar techniques to display data:
 - https://healthmap.org/pt/

## Milestone 2 (26th April, 5pm)

**10% of the final grade**


## Milestone 3 (31st May, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

