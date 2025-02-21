import userRepository from "../repository/user.repository.js"

export const updateUserInfoContoller = async (req, res) => {
    try{
        const {id} = req.user
        const {username, img_profile} = req.body

        await UserRepository.updateUser(id, {username, img_profile})

        return res.json({
            ok: true,
            status: 200,
            message: 'User information updated'
        })
    } catch(error){
        console.error(error)
        return res.json({
            ok: false,
            status: 500,
            message: 'Internal server error'
        })
    }
}