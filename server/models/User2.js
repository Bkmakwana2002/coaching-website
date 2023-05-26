const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const user2Schema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true }, // to be verified
        DOB: { type: Date, required: true },
        password: { type: String, required: true },
        phone: { type: Number, required: true }, // to be verified 
        courses : [ { type: String } ],
        pic: {
            type: "String",
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        verified:{type:Boolean, required:true, default:false}
    },
    { timestaps: true }
)

user2Schema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

user2Schema.pre("save", async function (next) {
    if (!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

const User2 = mongoose.model("User2", user2Schema)

module.exports = User2