import pool from "../config/mysql.config.js"

class ChannelRepository {
  async createChannel(user_id, { name, workspace_id }) {
    const query = `
      INSERT INTO channels (name, workspace, createdBy)
      VALUES (?, ?, ?)
    `
    try {
      const [result] = await pool.execute(query, [name, workspace_id, user_id])
      console.log("Resultado de la inserción:", result)
      return { _id: result.insertId, name, workspace: workspace_id, createdBy: user_id }
    } catch (error) {
      console.error("Error al crear el canal en la base de datos:", error)
      throw error
    }
  }

  async getAllChannelsByWorkspaceId(workspace_id) {
    const query = `SELECT * FROM channels WHERE workspace = ?`
    try {
      const [channels] = await pool.execute(query, [workspace_id])
      return channels
    } catch (error) {
      console.error("Error al obtener los canales:", error)
      throw error
    }
  }

  async getChannelById(channel_id) {
    const query = `SELECT * FROM channels WHERE _id = ?`
    try {
      const [channels] = await pool.execute(query, [channel_id])
      return channels[0] // Retorna el primer canal encontrado o undefined si no hay resultados
    } catch (error) {
      console.error("Error al obtener el canal por ID:", error)
      throw error
    }
  }
}

export default new ChannelRepository()