# Self-Assessment (Backend)

Jiya (me) and Swostika worked together on backend development. As a group, we collaborated closely, debugging each other’s code and sharing insights throughout the process. Since many of our learnings overlapped, we decided to divide the documentation of our experiences. This way, each of us could highlight distinct aspects of our work while avoiding repetition, ensuring that our collective reflection remained comprehensive and non‑redundant.

### 1: Usage of api-fake server instead of api-server file.

Initially, while we were testing, we were testing the mock json data instead of our own code. We weren't able to see the data in mongodb either. It was also using (`localhost//8000`). It then proceeded to fail our tests when were trying to fetch the jobs using id. We got import errors as well.

### Key Improvements:

Moving all the files back to api-server-starter fixed the error. We tested it again and now it works.

### 2: Improving Signup Validation

While testing the signupUser endpoint in Postman, the request failed with the error:

`All fields must be filled`

While testing with Postman which needed all six fields, I had only passed name, email,so postman kept failing .

```javascript
const signupUser = async (req, res) => {
  const { name, email, password } = req.body
try {
    if (!name || !email || !password )
```

### Solution:

This happened because the backend required six fields:
`name,
email,
password,
phone_number,
gender,
address,`

Since phone_number, gender, and address were missing, the validation threw an error immediately.

```javascript
// Improving signup validation
const signupUser = async (req, res) => {
  const { name, email, password, phone_number, gender, address } = req.body

  try {
    if (!name || !email || !password || !phone_number || !gender || !address)
      throw new Error('All fields must be filled')

    if (!validator.isEmail(email)) throw new Error('Email not valid')
    if (!validator.isStrongPassword(password))
      throw new Error('Password not strong enough')
    if (!validator.isMobilePhone(phone_number))
      throw new Error('Invalid phone number')

    const exists = await User.findOne({ email })
    if (exists) throw new Error('Email already in use')
```

### Key Improvements:

- Backend can now accept all fields and validate them properly.

- Prevents errors caused by missing fields in Postman requests.

- Backend testing can continue independently of frontend.

### 3: UserModel improvement

Initially, the User model also only included:

`name`,
`email`,
`password`

```javascript
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})
```

### Solution:

We then updated the schema to include all required fields, Now the model supports all fields required for signup and allows proper validation.

```javascript
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    gender: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
  },
  { timestamps: true, versionKey: false }
)
```

### Lessons learnt.

- Always align the schema and controller fields.
- Missing fields in the model can cause subtle backend errors.
- Test API routes thoroughly with Postman before connecting the frontend.
- Validation should reflect the actual schema requirements.
