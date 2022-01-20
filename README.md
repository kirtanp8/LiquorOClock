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

I wanted to ensure that my application was visually appealing to the user but also relevant to what most recipe websites would look like, so I planned my website by building wireframes for the front-end. In order to create the wireframes, I used LucidApp, having used Figma previously, I thought it would be good to try a new application, and to be honest I thought it was a lot easier to navigate through. 

I have added some copies of my wireframes below. Working on a wireframe, gave me a clear idea of something to work for and picture when doing the front-end which took up the most of my time when working on the project.

# Gallery Page Wireframe 

![cocktail page](https://user-images.githubusercontent.com/83728526/148702332-8253590a-f5dc-4a1f-a333-3f0c2d2685f4.png)

# Profile Page Wireframe

![home page](https://user-images.githubusercontent.com/83728526/148702333-5f1aeb72-0fbf-4565-9d07-9dc4ec2a16d3.png)

# Home Page Wireframe

![recipe page](https://user-images.githubusercontent.com/83728526/148702334-659954b5-b6b8-4b36-9382-d7f7ba62a049.png)

# Backend and Database

**Users**

This was my first project using both Django and Python as the main language & framework to interact with a PostgreSQL database, so it was quite the learning curve for me however, the error messaging was very clear and precise and came in handy when I was debugging. 

As I was building my User's profile in the backend, I discovered that I would need to create seperate versions of the User's profile. For example, I wanted to create a many-to-many relationship with the User and their saved items, however, when doing this without creating a seperate serializer, it would create an infinite relationship loop which caused me much headache to figure out.  


```

class SavedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'
        
```

In my database I needed several users who could post and share their own recipes and comment on them as well as other user's recipes. 

As advised by my teacher, it was best to start off by creating the user model. 

```
class JWTAuthentication(BasicAuthentication):

    def authenticate(self, request):
        header = request.headers.get('Authorization')
        if not header:
            return None
        if not header.startswith('Bearer'):
            raise PermissionDenied(detail="Invalid Auth Token Format!")
        token = header.replace('Bearer ', '')

        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))

        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied(detail="Invalid Token!")

        except User.DoesNotExist:
            raise PermissionDenied(detail="Not Found")
        return (user, token)

```

I started off by adding in the authentication which is very similar to how my team wrote the `secureRoute` middleware in the Express module for our MERN stack project.

* First I check for an Authorization header. If there isn't one, I return `None`, which means the user continues as an unauthorised user, they will not be able to perform any authorised actions.
* `if` there is a header but it does not start with Bearer I throw a `PermissionDenied` error, which will in turn return a `403 response` with the message `Invalid Auth Token Format!`.
* `if` the header is approved, I extract the token from it by removing the `Bearer` portion of the string, then decode the token, which gives back the payload, including the sub or user's ID. This `gets` the user from the database.

**Below** I also needed to ensure the user can register. The view below simply creates a new user and sends back a success message if all is well, and any errors `if` not. 

```

class RegisterView(APIView):

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({
                'message': 'Registration Successful!'
            },
                status=status.HTTP_200_OK
            )
        return Response(user_to_create.errors,
                        status=status.HTTP_422_UNPROCESSABLE_ENTITY
                        )
```

However, the login view below finds the user by email and verifies their password with Django's check_password function that's automatically added to the user object. `if` there is an error, I send back an error message but if all is well and good the view creates a token and returns it to the client in the response. 

```

class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail="Invalid Credentials")

        if not user_to_login.check_password(password):
            raise PermissionDenied(detail="Invalid Credentials")

        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {'sub': user_to_login.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        return Response({'username': user_to_login.username, 'id': user_to_login.id, 'token': token, 'message':
                        f"Welcome back, {user_to_login.username}!"},
                        status=status.HTTP_200_OK)


```


**Recipes**

The next step was to implement a Recipes Model which held a one to many relationship with the reviews model, as one Recipe could have multiple reviews. It also held a one-to-many relationship with the user as one user has the access to post many recipes. 

To do this, I added an owner to the Recipe model with the below code, meaning whenever a user posts a Recipe to the database a user ID number will be stored in the object.

```
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='recipes',
        on_delete=models.CASCADE,
    )

```

However, I also needed a populated serializer to ensure I retrieved all the details of the user who posts the recipes to the database. 

```

class PopulatedRecipeSerializer(RecipeSerializer):
    reviews = PopulatedReviewSerializer(many=True)
    owner = UserSerializer()

```

Otherwise, this would give me more work to do in the frontend. 


```

class RecipeDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_recipe(self, pk):
        try:
            return Recipe.objects.get(pk=pk)
        except Recipe.DoesNotExist:
            raise NotFound(detail="The Recipe Cannot Be Found")

    def get(self, request, pk):
        recipe = self.get_recipe(pk=pk)
        serialized_recipe = PopulatedRecipeSerializer(recipe)
        return Response(serialized_recipe.data, status=status.HTTP_200_OK)


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

# Frontend Challenges

**Save** and **Unsave**

Due to the code in the backend being so well-put together, accessing the data from the frontend was made so much easier. However, the toughest challenge I set myself was to be able to `save` and `unsave` a recipe to the user's profile page. It's also something I knew I wanted to do from the beginning because during my project 3, I never got a chance to help with the `like` and `unlike` button.

So the first thing I did was make a request for the user's saved recipes, which I got from the below `get` request.

* The function stores the user's saved recipes in a variable using `setSaved(response.data.saved)`
* 

```
    useEffect(() => {
    async function fetchUserDetail() {
      const config = {
        method: 'get',
        url: '/api/auth/saved/',
        headers: { 
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
      }

      const response = await axios(config)
      setSaved(response.data.saved)
    }
    fetchUserDetail()
  }, [])

```

Then I know what cocktail page the user is on with the `useParams()` method --> `const { id } = useParams()`.

` const isSaved = saved.filter(ele => ele.id == id ? true : false) `.  The filter method here then checks to see if the user has saved the cocktail in their saved recipes, `if` they do then the `isSaved` variables length will be 1, `else` it will be 0.


So therefore, in the below `return` I check to see `if` the `isSaved` variable's length has a value of 1, `if` it does then the user will be able to see the Save Recipe button, `else` they will see `Unsave`.   

```
     <div className='save-recipe'>
        {isSaved.length === 1 ?
          <UnSaveRecipe className='save' isSaved={isSaved} setIsSaved={setIsSaved} /> : <SaveRecipe className='save' isSaved={isSaved} setIsSaved={setIsSaved} />
        }
          <Button onClick={handleAddReviewShow}>REVIEW</Button>
          <AddReview handleAddReviewClose={handleAddReviewClose} handleAddReviewShow={handleAddReviewShow} addReviewShow={addReviewShow}/>
      </div>

```

**React Stars and Modal Review Form**

Another cool feature of my application is the implementation of the Modal Review Form and being able to give a star rating.

![Screenshot 2022-01-10 at 19 44 20](https://user-images.githubusercontent.com/83728526/148828962-c08f0ed6-2a57-4874-bca3-08f1970876ec.png)

To be able to have the Modal Review Form appear on screen, I needed to make use of the React Hook `useState()`. 

To do this I first set the variable below as a `false` value so that it will always remain closed and it will only show up when the user clicks the review button. 

`const [addReviewShow, setAddReviewShow] = useState(false)`

I then created two arrow functions below which change the value of the state variable.

```
  const handleAddReviewShow = () => setAddReviewShow(true)
  const handleAddReviewClose = () => setAddReviewShow(false)
  
```

as I can tell React that the Modal Review form must appear only when the variable addReviewShow has been set to `true`.

```
    <Modal
      show={addReviewShow}
      onHide={handleAddReviewClose}
     >
```
And this is done when the user clicks on the review button below.

```
<Button onClick={handleAddReviewShow}>REVIEW</Button>
```

# Challenges 

* Building a full stack application on your own for the first time is something to be proud. Problem solving and taking time to think through the errors has for sure given me some valuable experience prior to entering the industry.
* Deploying the application, I didn't think it would take as long as it did but glad I managed to experience doing it alone. 

# Wins 

* I am really happy with my design, the mobile view, the addition of the hamburger, it comes in handy for the mobile view.
* The colour scheme deserves a retweet too.
* Learning how to implement one-to-many relationships and many-to-many relationships in the backend should come handy in the near future. 

# Key Learnings

* Learning how to deploy a website with netlify following steps provided by GA instructors, experiencing what needed to be re-arranged and fixing the bugs that came with this particluar experience and solving them using Google as a guide.
* Learning how to use cloudinary. 

# Future Enhancements

* Adding a search bar so users can search for different recipes and see if they are already there. 
* Users being able to like each other's reviews, maybe upvote and downvote them.
