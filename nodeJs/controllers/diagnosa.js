const diagnosa = async (req, res) => {
    try {
        const deleteduser = await Project.deleteOne({_id:req.params.id});
        res.status(200).json(deleteduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
export default diagnosa;