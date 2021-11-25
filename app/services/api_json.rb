module ApiJson
  def build_object(object)
    serializer = "Api::#{object.class.name}Serializer".constantize
    { json: object, serializer: serializer }
  end

  def build_objects(objects)
    serializer = "Api::#{objects.first.class.name}Serializer".constantize
    { json: objects, each_serializer: serializer }
  end

  def build_object_error_managed(object)
    return build_object(object) if object.errors.empty?

    { json: { errors: object.errors.full_messages }, status: :bad_request }
  end
end
