
# AI Prompts – Test Design

Prompt:-
-------
Kindly generate the Test cases which should also include below types:-

positive/negative/edge, Smoke /Regression


Kindly refer below 2 sample TCs for reference:-

AC1: User Registration & Login

The user should be able to register with valid details, log in using the registered credentials, and verify their profile information successfully.


AC2: End-to-End Purchase Flow

The user should be able to browse products, add multiple items to the cart (including updating quantity), complete the checkout using Cash on Delivery, and successfully view the generated invoice under My Invoices. 


Note - There should not be more than 5-8 test cases of each type ( manual+UI) which includes @Smoke, @regression 

The test cases data should be in below format:-
TC ID | Type (Positive, Negative, Edge) | Execution Type | Title | Description | Test data (if require) | Pre-requiesit | Test Steps | Expected Output | Actual Output | Status 


Let me know if require any other inputs from my side.

Home Page - https://practicesoftwaretesting.com/
Some Product page from where the user get a option to add the items to cart:-
https://practicesoftwaretesting.com/product/01KZ36RV84E2738RYPW268N6DK
https://practicesoftwaretesting.com/product/01KZ36RV89A8Z280K5W9GQ70Z8
https://practicesoftwaretesting.com/product/01KZ36RV86RQBWHQAMFPSV5T37
Checkout page - https://practicesoftwaretesting.com/checkout
User login require to place order




Response:-
---------
You have provided enough information to generate the test cases.

Based on your requirements, I'll prepare a professional QA test suite rather than simply listing scenarios.

Deliverables

The test suite will include:

Manual UI Test Cases
Positive
Negative
Edge cases
Tagged as @Smoke and @Regression

Coverage
User Registration
Login
Product Search
Product Details
Add to Cart
Update Cart
Checkout
Cash on Delivery
Invoice Validation
Logout
Basic validation/error scenarios

Execution Types
Manual
UI


Format

| TC ID | Type | Execution Type | Title | Description | Test Data | Pre-requisite | Test Steps | Expected Output | Actual Output | Status |


Assumptions I'll use

Unless you tell me otherwise, I'll use these assumptions:

Test Environment: Practice Software Testing
Browser: Chrome Latest
Payment Method: Cash on Delivery
Existing customer account available for login
Product stock available
Guest checkout not allowed
Invoice generated after successful order
Default language: English
Number of Test Cases

Following your instruction, I'll keep it concise:

Suite	Count
Manual/UI (Positive)	5–8
Manual/UI (Negative)	5–8
Manual/UI (Edge)		5–8



Prompt:-
------
Ok, looks good.
Please generate the Test cases:-

Response:-
---------

Below is  Manual/UI Test Cases. I've kept the suite concise (8 test cases) while covering Positive, Negative, Edge, and tagging each as @Smoke or @Regression.

Manual/UI Test Cases
TC ID	Type	Execution Type	Title	Description	Test Data	Pre-requisite	Test Steps	Expected Output	Actual Output	Status
TC_UI_001 @Smoke	Positive	Manual/UI	Verify user can register and login successfully	Verify a new user can register, login and access profile.	Valid user details	User is not registered	1. Open Home Page.
2. Click Sign In/Register.
3. Register with valid details.
4. Login using registered credentials.
5. Navigate to My Profile.	Registration succeeds. User logs in successfully and profile information is displayed correctly.		
TC_UI_002 @Smoke	Positive	Manual/UI	Verify complete purchase flow using Cash on Delivery	Validate end-to-end purchase flow including invoice generation.	Valid login, COD	Registered user	1. Login.
2. Search a product.
3. Open product details.
4. Add product to cart.
5. Update quantity.
6. Checkout.
7. Select Cash on Delivery.
8. Place order.
9. Navigate to My Invoices.	Order is placed successfully. Invoice is generated and visible under My Invoices.		
TC_UI_003 @Smoke	Positive	Manual/UI	Verify search, filter and sorting functionality	Verify user can locate products using search, category, price range and sorting.	Product Name: Hammer	Products available	1. Search for a product.
2. Apply Category filter.
3. Apply Price filter.
4. Sort Price Low→High.	Only matching products are displayed and sorting/filtering work correctly.		
TC_UI_004 @Regression	Negative	Manual/UI	Verify login with invalid credentials	Verify system rejects invalid login attempts.	Invalid email/password	Login page available	1. Open Login page.
2. Enter invalid credentials.
3. Click Login.	Login fails and appropriate validation message is displayed.		
TC_UI_005 @Regression	Negative	Manual/UI	Verify checkout without mandatory fields	Verify mandatory checkout fields are validated.	Blank address	User logged in with product in cart	1. Add product to cart.
2. Proceed to Checkout.
3. Leave mandatory fields blank.
4. Continue.	Mandatory validation messages are displayed and order is not placed.		
TC_UI_006 @Regression	Negative	Manual/UI	Verify quantity exceeding available stock	Verify quantity cannot exceed available inventory.	Quantity > Stock	Product available	1. Open Product.
2. Enter quantity greater than stock.
3. Add to Cart.	System prevents adding quantity exceeding stock and shows an appropriate message.		
TC_UI_007 @Regression	Edge	Manual/UI	Verify cart persistence after session refresh	Verify cart contents persist after browser refresh/login.	Existing cart	Product added to cart	1. Add products to cart.
2. Refresh browser.
3. Login again if required.
4. Open Cart.	Previously added products remain in the cart.		
TC_UI_008 @Regression	Edge	Manual/UI	Verify language change across pages	Verify selected language persists while navigating the application.	Change language	Home page loaded	1. Change language.
2. Navigate to Product page.
3. Open Cart.
4. Open Checkout.	Selected language remains applied across all pages.
