export function getValueFromForm(res, fieldName, attributeName = "value") {
  return res
    .html()
    .find(`input[name=${fieldName}]`)
    .first()
    .attr(attributeName);
}
