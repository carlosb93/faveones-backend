let relationCalls = null

module.exports = {
  init: calls => relationCalls = calls,
  getCalls: () => relationCalls,
}