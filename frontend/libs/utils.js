function mappingByKey(object, key) {
  const mappped = {};

  object.forEach(x => {
    mappped[x[key]] = x;
  });

  return mappped;
}

function unMappingByKey(object) {
  return Object.values(object);
}

export function JSONNestJoin(parents, childs, parentKey, childKey, func) {
  const mapped = mappingByKey(parents, parentKey);

  childs.forEach(child => {
    const joinValue = child[childKey];

    if (mapped[joinValue]) {
      const parentElement = mapped[joinValue];

      mapped[joinValue] = func(parentElement, child);
    }
  });

  return unMappingByKey(mapped);
}
