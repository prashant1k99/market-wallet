const handleError = (err, res) => {
  res.status(err.status || 500).send({
    msg: err?.msg || err?.message || 'Something went wrong, please try again'
  })
}

module.exports = handleError