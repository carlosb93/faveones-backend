let feedCalls = null

module.exports = {
  init: calls => feedCalls = calls,
  getCalls: () => feedCalls,
}