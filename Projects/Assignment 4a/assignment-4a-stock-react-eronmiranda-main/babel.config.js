// since babel doesn't support es6 modules (currently)
// we need to make our jest (babel aware)
// here we are transforming modules only if it's not our testing environment.

module.exports = api => {
  const isTest = api.env('test');
  return {
    "presets": [
      [
        "@babel/preset-env",
        {
          targets: {
            node: 'current',
          },
          "modules": isTest ? "auto" : false
        }
      ],
      [
        "@babel/preset-react"
      ]
    ]
  }
}
