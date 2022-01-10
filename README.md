# SPIRITSO'CLOCK :cocktail:

A Website for Viewing and Sharing Cocktail Recipes. 

Feel free to browse the application at: https://spiritsoclock2021.herokuapp.com/login
* Username: admin@admin.com
* Password: Master99

# Project Overview

The task was to create a Django + Python Application, utilising the information we had been taught the week prior. After working in a team for project 3, I wanted to aim for the challenge and see if I could test my own abilities.

# Languages/Technologies Used

* HTML5, CSS3
* Bootstrap, Sass
* JavaScript ES6+
* React
* Python
* Django
* PostgreSQL
* Yarn, NPM
* Git, GitHub
* Postman, Postbird, Insomnia

# Wireframes 

I wanted to ensure that my application was visually appealing to the user but also relevant to what most recipe websites would look like, so I planned my website by building wireframes for the front-end. In order to create the wireframes, I used Lucid App having used Figma previously I thought it would be good to try a new application, and to be honest I thought it was a lot easier to navigate. 

I have added some copies of my wireframes below. Working on a wireframe, gave me a clear idea of something to work for and picture when doing the front-end which took up the most of my time when working on the project.

# Gallery Page Wireframe 

![cocktail page](https://user-images.githubusercontent.com/83728526/148702332-8253590a-f5dc-4a1f-a333-3f0c2d2685f4.png)

# Profile Page Wireframe

![home page](https://user-images.githubusercontent.com/83728526/148702333-5f1aeb72-0fbf-4565-9d07-9dc4ec2a16d3.png)

# Home Page Wireframe

![recipe page](https://user-images.githubusercontent.com/83728526/148702334-659954b5-b6b8-4b36-9382-d7f7ba62a049.png)

# Backend and Database

This was my first project using both Django and Python as the main language & framework to interact with a PostgreSQL database, so it was quite the learning curve for me however, the error messaging was very clear and precise and came in handy when I was debugging. 

As I was building my User's profile in the backend, I discovered that I would need to create seperate versions of it. For example, I wanted to create a many-to-many relationship with the User and their saved items, however, when doing this without creating a seperate serializer, it would create an infinte relationship loop which caused me much headache to figure out.  


```

class SavedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'
        
```

# Mobile View

The website can be viewed on mobile, also when you shrink the page the website doesn't go pear shaped. 

https://user-images.githubusercontent.com/83728526/147891303-783b9d05-626b-4722-ae44-e8de51c6cd9e.mp4

# Secure Routes

Authentication fueled by Django means that users will need to be logged in and registered to the app before they can make use of all the content supplied by the website. 

![Screenshot 2022-01-02 at 22 14 22](https://user-images.githubusercontent.com/83728526/147890820-b7d884c6-2e5a-4f35-9fc0-95b065abe685.png)

# Recipe Page 

Probably the coolest part of functionality was users being able to save and unsave their recipes. The implementation of a Modal Review form was a cool addition too. 

https://user-images.githubusercontent.com/83728526/147891500-c5441a44-b207-4b13-8647-63f2209925b2.mp4

I've added where the inspiration came from below:
![Screenshot 2022-01-08 at 22 57 58](https://user-images.githubusercontent.com/83728526/148662696-43a9fd23-f3bf-4c57-b927-d6c595034b13.png)




# Profile Page 

Users can see their saved items and the recipes they have added to the database through their profile page. I think I should have made use of the profile picture but didn't really find it necessary for the website. I think being able to learn how to implement cloudinary and uploading a photo onto a website gave me enough satisfaction. 

![Screenshot 2022-01-02 at 22 36 58](https://user-images.githubusercontent.com/83728526/147891225-773b0c08-21ba-4391-a59f-d94371140512.png)

# Challenges 

* Building a full stack application on your own for the first time is something to be proud. Problem solving and taking time to think through the errors has for sure given me some valuable experience prior to entering the industry.
* Deploying the application, I didn't think it would take as long as it did but glad I managed to experience doing it alone. 

# Wins 

* I am really happy with my design, the mobile view, the addition of the hamburger, it comes in handy for the mobile view.
* The colour scheme deserves a retweet too.
* Learning how to implement one-to-many relationships and many-to-many relationships in the backend should come handy in the near future. 

# Future Enhancements

* Adding a search bar so users can search for different recipes and see if they are already there. 
* Users being able to like eachother's reviews, maybe upvote and downvote them.
