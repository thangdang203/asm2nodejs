import User from '../models/user';
import { signupSchema, signinSchema } from '../schema/auth';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message)
            })
        }
        const useExist = await User.findOne({ email: req.body.email })
        if (useExist) {
            return res.status(400).json({
                message: "email đã tồn tại"
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.hashedPassword
        })
        return res.status(201).json(user)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message),
            });
        }
        // Kiểm tra xem user đã đk chưa?
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Email không tồn tại",
            });
        }

        // So sánh mật khẩu

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng",
            });
        }

        const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1d" });

        user.password = undefined;

        return res.status(200).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};