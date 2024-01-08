const viewRecord = (req,res) => {
    return res.render('index');
}

const add = (req,res) => {
    return res.render('add');
}

module.exports ={
    viewRecord,
    add
}