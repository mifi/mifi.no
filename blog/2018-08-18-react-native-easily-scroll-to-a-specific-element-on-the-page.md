---
slug: react-native-easily-scroll-to-a-specific-element-on-the-page
title: "React Native: Smooth scroll to a specific element in a list (using hooks)"
authors: mifi
tags:
  - react
  - react native
  - ios
  - android
  - open source
---

If you need to scroll to a specific View in a ScrollView, specified by a prop `scrollToId` to that page, do something like this:

<!--truncate-->

```javascript
const Component = ({ entities, scrollToId }) => {
  const viewsRef = useRef({});
  const scrollerRef = useRef();

  useEffect(() => {
    if (scrollToId == null) return;
    const scrollToView = viewsRef.current[scrollToId];
    if (!scrollToView) return;
    scrollToView.measure((x, y, w, h) => scrollerRef.current.scrollTo({ x, y }));
  }, [scrollToId]);

  return (
    <ScrollView ref={scrollerRef}>
      {entities.map(({ entityId }) => (
        <View key={entityId} ref={(ref) => { viewsRef.current[entityId] = ref; }}>
          {/* ... */}
        </View>
      ))}
    </ScrollView>
  );
}
```

## Old non-hooks solution
```javascript
render() {
  const { entities, scrollToId } = this.props;

  return (
    <ScrollView ref={ref => {this.scrollerRef = ref; }}>
      {entities.map((entity) => {
        const scrollThis = scrollToId != null && scrollToId === entity.id;

        return (
          <View
            key={entity.id}
            ref={scrollThis ? (ref) => { this.scrollToRef = ref; } : undefined}
            onLayout={scrollThis ? this.onLayout : undefined}
          >
            <Text>Some stuff to show from entity</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

onLayout = () => {
  this.scrollToRef.measure((x, y, width, height, pageX, pageY) => {
    if (this.scrollerRef) this.scrollerRef.scrollTo({ x: pageX, y: pageY });
  });
}
```

`entities` is assumed to be a list of something you want to render, with a unique prop `id`.
