
import User from "../models/User.model.js"
import Workspace from "../models/Workspace.model.js"
import WorkspaceRepository from "../repository/workspaces.repository.js"
import UserRepository from "../repository/user.repository.js"
import { ServerError } from "../utils/errors.util.js"

export const createWorkspaceController = async (req, res) => {
    try {
      const { id } = req.user
      const { name } = req.body
  
      if (!name) {
        return res.status(400).json({
          ok: false,
          message: "Workspace name is required",
          status: 400,
        })
      }
  
      const workspace = await WorkspaceRepository.createWorkspace(id, name)
  
      return res.status(201).json({
        ok: true,
        message: "Workspace created successfully",
        status: 201,
        data: {
          workspace,
        },
      })
    } catch (error) {
      console.error("Error in createWorkspaceController:", error)
      return res.status(500).json({
        ok: false,
        message: "Internal server error",
        status: 500,
        error: error.message,
      })
    }
  }  

export const inviteUserToWorkspaceController = async (req, res) =>{
    try{
        const {id} = req.user
        const {workspace_id} = req.params
        const {email} = req.body

        //si el user_invited._id no esta en el workspace_selected.members
        
        const user_invited = await UserRepository.findUserByEmail(email)
        if(!user_invited){
            throw new ServerError('User not found', 404)
        }
        const workspace_modified = await WorkspaceRepository.addMemberToWorkspace(workspace_id, user_invited._id)
        return res.json({
            ok: true,
            status: 201,
            message:'User invited successfully',
            data: {
                workspace_selected: workspace_modified
            }
        })
    }
    catch(error){
        console.error(error)
        if(error.status){
            return res.json(
                {
                    ok: false,
                    message: error.message,
                    status: error.status
                }
            )
        }
        return res.json({
            ok:false,
            message: "Internal server error",
            status: 500,
        })
    }
}

export const getWorkspacesController = async (req, res) => {
    try {
      const { id } = req.user
      const workspaces = await WorkspaceRepository.getAllWorkspacesByMemberId(id)
  
      return res.json({
        ok: true,
        status: 200,
        message: "Workspaces list",
        data: {
          workspaces,
        },
      })
    } catch (error) {
      console.error("Error in getWorkspacesController:", error)
      return res.status(500).json({
        ok: false,
        message: "Internal server error",
        status: 500,
        error: error.message,
      })
    }
  }